import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './repCreate.css'
import './base.css'
import App from './App.jsx'
import ReportIssueForm from './reportCreate'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReportIssueForm/>
  </StrictMode>,
)
