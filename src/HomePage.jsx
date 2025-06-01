import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Logo from "./components/Logo"


const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <Logo />
        <h1>Condominium Management System</h1>
      </div>
      <div className="modules-container">
        <div className="module">
          <h2 className="module-title">Order Management</h2>
          <nav className="module-nav">
            <Link to="/order-registration" className="nav-link">
              Order Registration
            </Link>
            <Link to="/order-history" className="nav-link">
              Order History
            </Link>
            <Link to="/order-management" className="nav-link">
              Order Management
            </Link>
          </nav>
        </div>

        <div className="module">
          <h2 className="module-title">Request Management</h2>
          <nav className="module-nav">
            <Link to="/create-request" className="nav-link">
              Create Request
            </Link>
            <Link to="/request-list" className="nav-link">
              Request Status
            </Link>
            <Link to="/request-management" className="nav-link">
              Request Management
            </Link>
          </nav>
        </div>

        <div className="module">
          <h2 className="module-title">Announcement Management System</h2>
          <nav className="module-nav">
            <Link to="/announcement-registration" className="nav-link">
              Announcement Registration
            </Link>
            <Link to="/announcement-history" className="nav-link">
              Announcement History
            </Link>
          </nav>
        </div>

        <div className="module">
          <h2 className="module-title">Invoice Management</h2>
          <nav className="module-nav">
            <Link to="/invoice-reports" className="nav-link">
              Invoice Reports
            </Link>
            <Link to="/invoice-history" className="nav-link">
              Invoice History
            </Link>
          </nav>
        </div>

        <div className="module">
          <h2 className="module-title">Report Management</h2>
          <nav className="module-nav">
            <Link to="/reportissueForm" className="nav-link">
               Create Report
            </Link>
            <Link to="/reportmain" className="nav-link">
              Reports History
            </Link>
          </nav>
        </div>

      </div>
    </div>
  )
}
export default HomePage
