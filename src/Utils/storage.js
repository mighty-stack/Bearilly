const isBrowser = () => typeof window !== "undefined";

const getStorage = (type = "local") => {
  if (!isBrowser()) return null;
  return type === "session" ? window.sessionStorage : window.localStorage;
};

export const getStorageItem = (key, fallback = null, type = "local") => {
  const storage = getStorage(type);
  if (!storage) return fallback;

  try {
    const value = storage.getItem(key);
    if (value === null) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const setStorageItem = (key, value, type = "local") => {
  const storage = getStorage(type);
  if (!storage) return;

  storage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = (key, type = "local") => {
  const storage = getStorage(type);
  if (!storage) return;

  storage.removeItem(key);
};

export const clearStorageByPrefix = (prefix, type = "local") => {
  const storage = getStorage(type);
  if (!storage) return;

  Object.keys(storage).forEach((key) => {
    if (key.startsWith(prefix)) {
      storage.removeItem(key);
    }
  });
};

export const getStringItem = (key, fallback = "", type = "local") => {
  const storage = getStorage(type);
  if (!storage) return fallback;

  const value = storage.getItem(key);
  return value === null ? fallback : value;
};

export const setStringItem = (key, value, type = "local") => {
  const storage = getStorage(type);
  if (!storage) return;

  storage.setItem(key, value);
};

export const storage = {
  clearByPrefix: clearStorageByPrefix,
  get: getStorageItem,
  getString: getStringItem,
  remove: removeStorageItem,
  set: setStorageItem,
  setString: setStringItem,
};

export default storage;
