import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/Login.css'
import './css/Signup.css'
import './css/index.css'
import './css/repCreate.css'
import './css/base.css'
import './css/ReportManage.css'
import './css/Reportmain.css'
import App from './components/Router.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
