import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register service worker for offline caching in physical shops
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        // SW registered
      })
      .catch((err) => {
        // Fallback gracefully
        console.warn('SW registration skipped:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
