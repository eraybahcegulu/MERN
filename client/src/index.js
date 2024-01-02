import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from "react-redux";
import { store } from "./store";
import { UserProvider } from "./contexts/userContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
);
