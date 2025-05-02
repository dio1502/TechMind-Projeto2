import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Login.css'
import './Signup.css'
import LogIn from './LogIn.jsx'
import SignUp from './SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignUp />
  </StrictMode>,
)
