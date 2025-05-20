import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Logo from "./components/Logo"
import AnnouncementDetails from "./pages/AnnouncemnetDetails"
import AnnouncementHistory from "./pages/AnnouncementHistory"
import AnnouncementRegistration from "./pages/AnnouncementRegistration"
import "./App.css"
import { AnnouncementProvider } from "./context/AnnouncementContext"

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <Logo />
        <h1>Announcement Management System</h1>
      </div>
      <nav className="main-nav">
        <Link to="/announcement-registration" className="nav-link">
          Announcement Registration
        </Link>
        <Link to="/announcement-history" className="nav-link">
          Announcement History
        </Link>
      </nav>
    </div>
  )
}

function App() {
  return (
  <><></><AnnouncementProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/announcement-registration" element={<AnnouncementRegistration />} />
            <Route path="/announcement-history" element={<AnnouncementHistory />} />
            <Route path="/announcement-details/:id" element={<AnnouncementDetails />} />
          </Routes>
        </div>
      </Router>
    </AnnouncementProvider></>
  )
}


export default App