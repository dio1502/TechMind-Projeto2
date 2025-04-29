import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import OrderHistory from "./pages/OrderHistory"
import OrderRegistration from "./pages/OrderRegistration"
import OrderDetails from "./pages/OrderDetails"
import Logo from "./components/Logo"
import { OrderProvider } from "./context/OrderContext"
import "./App.css"

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <Logo />
        <h1>Order Management System</h1>
      </div>
      <nav className="main-nav">
        <Link to="/order-registration" className="nav-link">
          Order Registration
        </Link>
        <Link to="/order-history" className="nav-link">
          Order History
        </Link>
      </nav>
    </div>
  )
}

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order-registration" element={<OrderRegistration />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  )
}

export default App
