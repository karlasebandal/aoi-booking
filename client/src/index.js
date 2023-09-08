import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import App from './components/App'
import { AuthProviderGuest } from './components/AuthContextGuest'
import { AuthProviderUser } from './components/AuthContextUser'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProviderGuest>
      <AuthProviderUser>
        <App />
      </AuthProviderUser>
      </AuthProviderGuest>
  </React.StrictMode>
)
