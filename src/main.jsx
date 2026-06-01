import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error handler to suppress browser extension errors
window.addEventListener('error', (event) => {
  const message = event.message || '';
  if (message.includes('message channel closed') || 
      message.includes('runtime.lastError') ||
      message.includes('Could not establish connection')) {
    event.preventDefault();
    event.stopPropagation();
    // Optionally log to debug channel
    console.debug('[Extension Error Suppressed]:', message);
    return true;
  }
});

// Unhandled promise rejection handler for extension errors
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.message || event.reason || '';
  if (typeof reason === 'string' && 
      (reason.includes('message channel closed') ||
       reason.includes('runtime.lastError') ||
       reason.includes('Could not establish connection'))) {
    event.preventDefault();
    // Optionally log to debug channel
    console.debug('[Extension Promise Rejection Suppressed]:', reason);
    return true;
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
