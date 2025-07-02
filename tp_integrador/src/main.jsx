import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from './store/Store.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertProvider } from "./components/AlertContext";

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <BrowserRouter>
      <AlertProvider>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>
);
