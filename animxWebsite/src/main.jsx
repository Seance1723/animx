import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.scss'

// Import AnimX engine and styles globally for instant preview availability
import AnimX from '../../dist/animx.esm.js'
import '../../dist/animx.min.css'
window.AnimX = AnimX;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
