import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import './index.css';
import './main.css';
import { ThemeProvider } from 'contexts/themeContex';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  </ThemeProvider>
);

