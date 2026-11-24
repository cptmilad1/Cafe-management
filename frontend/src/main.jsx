import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSocket } from './features/shared/api/socket'

const stored = localStorage.getItem('cafe-auth-storage')
let token = null
if (stored) {
  try {
    const parsed = JSON.parse(stored)
    token = parsed.state?.token || null
  } catch (_) {
    token = null
  }
}

if (token) {
  initSocket(token)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
