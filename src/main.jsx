import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The loading screen lives in index.html so it can paint before this bundle
// has even finished downloading (see the inline <style> there). Once React
// has mounted, fade it out and remove it rather than snapping it away.
const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  requestAnimationFrame(() => {
    initialLoader.classList.add('initial-loader--done');
    setTimeout(() => initialLoader.remove(), 400);
  });
}
