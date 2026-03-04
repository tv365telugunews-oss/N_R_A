import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';
import '@/styles/index.css';
import { seedDemoUser } from '@/app/utils/seedDemoUser';

// Create demo user on app start
seedDemoUser();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA (only in web, not in Capacitor)
// Multiple checks to ensure we're not in Capacitor environment
const isCapacitor = 
  window.location.protocol === 'capacitor:' ||
  window.location.protocol.includes('capacitor') ||
  // @ts-ignore - Capacitor global
  (typeof window.Capacitor !== 'undefined') ||
  // Check if running in WebView
  navigator.userAgent.includes('wv') ||
  // Android WebView check
  navigator.userAgent.includes('Android') && navigator.userAgent.includes('Version/');

if ('serviceWorker' in navigator && !isCapacitor) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
} else if (isCapacitor) {
  console.log('🤖 Running in Capacitor - Service Worker disabled');
}