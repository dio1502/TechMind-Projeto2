import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/repCreate.css'
import './css/base.css'
import './css/ReportManage.css'
import './css/Reportmain.css'
import App from './App.jsx'
import ReportIssueForm from './reportCreate'
import Reportmanage from './reportManage.jsx'
import ReportMain from './reportmain.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReportMain/>
  </StrictMode>,
)
