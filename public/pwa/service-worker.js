/* ============================================================================
   SERVICE WORKER - OFFLINE & CACHING STRATEGY
   ============================================================================ */

const CACHE_NAME = 'bearily-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/global.css',
  '/styles/variables.css',
  '/styles/layout.css',
  '/styles/forms.css',
  '/styles/dashboard.css',
  '/styles/animations.css',
];

const DYNAMIC_CACHE = 'bearily-dynamic-v1';
const API_CACHE = 'bearily-api-v1';

/* ============================================================================
   INSTALL EVENT - CACHE STATIC ASSETS
   ============================================================================ */

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

/* ============================================================================
   ACTIVATE EVENT - CLEAN UP OLD CACHES
   ============================================================================ */

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && !cacheName.includes('dynamic') && !cacheName.includes('api')) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => client.postMessage({ type: 'SW_ACTIVATED' }));
        });
      })
  );
});

/* ============================================================================
   FETCH EVENT - NETWORK STRATEGY
   ============================================================================ */

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API requests - Network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // Return cached API response if network fails
          return caches.match(request)
            .then((response) => {
              if (response) {
                return response;
              }

              // Return offline page if available
              return caches.match('/offline.html')
                .catch(() => new Response('Offline - Please check your connection', {
                  status: 503,
                  statusText: 'Service Unavailable',
                }));
            });
        })
    );
    return;
  }

  // Static assets - Cache first, fallback to network
  if (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.eot')
  ) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }

          return fetch(request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type === 'error') {
                return response;
              }

              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });

              return response;
            })
            .catch(() => {
              console.warn('Service Worker: Failed to fetch', request.url);
              return new Response('Failed to fetch resource', {
                status: 503,
                statusText: 'Service Unavailable',
              });
            });
        })
    );
    return;
  }

  // HTML pages - Network first, fallback to cache
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((response) => {
              if (response) {
                return response;
              }

              return caches.match('/index.html')
                .catch(() => new Response('Offline - Page not available', {
                  status: 503,
                  statusText: 'Service Unavailable',
                }));
            });
        })
    );
    return;
  }

  // Default strategy - Network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      })
      .catch(() => {
        return caches.match(request)
          .catch(() => new Response('Resource not available', {
            status: 503,
            statusText: 'Service Unavailable',
          }));
      })
  );
});

/* ============================================================================
   MESSAGE EVENT - HANDLE CLIENT MESSAGES
   ============================================================================ */

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  }
});

/* ============================================================================
   BACKGROUND SYNC
   ============================================================================ */

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-submissions') {
    event.waitUntil(
      // Sync pending submissions when connection is restored
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_SUBMISSIONS',
            data: { status: 'starting' },
          });
        });
      })
    );
  }
});

/* ============================================================================
   PUSH NOTIFICATIONS
   ============================================================================ */

self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'bearily-notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification('Bearily', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window' })
      .then((clients) => {
        // Check if app window already exists
        for (let i = 0; i < clients.length; i++) {
          if (clients[i].url === '/' && 'focus' in clients[i]) {
            return clients[i].focus();
          }
        }

        // Open new window if not exists
        if (self.clients.openWindow) {
          return self.clients.openWindow('/');
        }
      })
  );
});

console.log('Service Worker loaded successfully');
