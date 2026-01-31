import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { FullscreenGate } from './components/FullscreenGate.jsx';
import { GlobalStyles } from './components/GlobalStyles.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FullScreenGate>
      <GlobalStyles />
      <App />
    </FullScreenGate>
  </React.StrictMode>,
);
