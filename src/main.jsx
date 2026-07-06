import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import './index.css' 
import './Styles/global.css'
import './Styles/animations.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Register service worker in production only
if (import.meta.env && import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/pwa/service-worker.js').then((reg) => {
      console.log('Service worker registered:', reg.scope)
    }).catch((err) => {
      console.warn('Service worker registration failed:', err)
    })
  })
}
