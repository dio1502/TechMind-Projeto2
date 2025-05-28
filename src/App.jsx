import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import OrderHistory from "./pages/OrderHistory"
import OrderRegistration from "./pages/OrderRegistration"
import OrderDetails from "./pages/OrderDetails"
import CreateRequest from "./pages/CreateRequest"
import RequestStatus from "./pages/RequestStatus"
import RequestList from "./pages/RequestList"
import RequestManagement from "./pages/RequestManagement"
import InvoiceReports from "./pages/InvoiceReports"
import InvoiceHistory from "./pages/InvoiceHistory"
import InvoiceDetails from "./pages/InvoiceDetails"
import InvoicePayment from "./pages/InvoicePayment"
import Logo from "./components/Logo"
import { OrderProvider } from "./context/OrderContext"
import { RequestProvider } from "./context/RequestContext"
import { InvoiceProvider } from "./context/InvoiceContext"
import "./App.css"
import OrderManagement from "./pages/OrderManagement"

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
      </div>
    </div>
  )
}

function App() {
  return (
    <OrderProvider>
      <RequestProvider>
        <InvoiceProvider>
          <Router>
            <div className="app">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/order-registration" element={<OrderRegistration />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />
                <Route path="/order-management" element={<OrderManagement />} />
                <Route path="/create-request" element={<CreateRequest />} />
                <Route path="/request-status/:id" element={<RequestStatus />} />
                <Route path="/request-list" element={<RequestList />} />
                <Route path="/request-management" element={<RequestManagement />} />
                <Route path="/invoice-reports" element={<InvoiceReports />} />
                <Route path="/invoice-history" element={<InvoiceHistory />} />
                <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
                <Route path="/invoice-payment/:id" element={<InvoicePayment />} />
              </Routes>
            </div>
          </Router>
        </InvoiceProvider>
      </RequestProvider>
    </OrderProvider>
  )
}

export default App

