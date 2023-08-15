import React from 'react'
import ReactDOM from 'react-dom/client'

//pages
import './assets/styles/App.css'
import App from './pages/App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
