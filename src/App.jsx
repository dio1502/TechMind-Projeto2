import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import OrderHistory from "./pages/OrderHistory"
import OrderRegistration from "./pages/OrderRegistration"
import OrderDetails from "./pages/OrderDetails"
import CreateRequest from "./pages/CreateRequest"
import RequestStatus from "./pages/RequestStatus"
import RequestList from "./pages/RequestList"
import RequestManagement from "./pages/RequestManagement"
import Logo from "./components/Logo"
import { OrderProvider } from "./context/OrderContext"
import { RequestProvider } from "./context/RequestContext"
import "./App.css"

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
          </nav>
        </div>

        <div className="module">
          <h2 className="module-title">Request Management</h2>
          <nav className="module-nav">
            <Link to="/create-request" className="nav-link">
              Create Request
            </Link>
            <Link to="/request-list" className="nav-link">
              Request List
            </Link>
            <Link to="/request-management" className="nav-link">
              Request Management
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <OrderProvider>
      <RequestProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order-registration" element={<OrderRegistration />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/order-details/:id" element={<OrderDetails />} />
              <Route path="/create-request" element={<CreateRequest />} />
              <Route path="/request-status/:id" element={<RequestStatus />} />
              <Route path="/request-list" element={<RequestList />} />
              <Route path="/request-management" element={<RequestManagement />} />
            </Routes>
          </div>
        </Router>
      </RequestProvider>
    </OrderProvider>
  )
}

export default App
