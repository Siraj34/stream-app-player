import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Store } from './store/Store';
import MusicContextProvider from './context/ContextAl';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster toastOptions={{position:'bottom-left'}}/>
     <Provider store={Store}>
    <BrowserRouter>
    <MusicContextProvider>
    <App />
  </MusicContextProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

