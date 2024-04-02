import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from './redux/store.js';
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
