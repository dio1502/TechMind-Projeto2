import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Login.css'
import './Signup.css'
import App from './components/Router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
