import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';
import '@/styles/index.css';
import { seedDemoUser } from '@/app/utils/seedDemoUser';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';

// Create demo user on app start
seedDemoUser();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);