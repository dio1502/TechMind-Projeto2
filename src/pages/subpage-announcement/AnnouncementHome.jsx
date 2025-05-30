import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Logo from "../../components/Logo"
import '../../css/App.css'

const HomeAnnoucement = () => {
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
export default HomeAnnoucement;
