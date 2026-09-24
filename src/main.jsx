/* ============================================================
   main.jsx — Point d'entrée de l'application
   ============================================================ */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Styles globaux (tokens, reset, animations)
import '@/styles/index.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
