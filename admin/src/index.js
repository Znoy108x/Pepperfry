import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PanelState from "./context/PanelState";

import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PanelState>
      <App />
    </PanelState>
  </React.StrictMode>
);