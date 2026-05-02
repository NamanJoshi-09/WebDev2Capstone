// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import { TOAST_CONFIG } from './utils/constants';

// src/main.jsx  ← ADD these two lines near top, after imports
import { seedDemoAccount } from './utils/seedDemo';
seedDemoAccount(); // ensure demo account exists on every load

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <App />
          <ToastContainer {...TOAST_CONFIG} />
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);