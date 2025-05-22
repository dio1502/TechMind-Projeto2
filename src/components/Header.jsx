import { Link } from "react-router-dom"
import Logo from "./Logo"

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <div className="header-text">
          <Link to="/" className="home-link">
            ← main menu
          </Link>
          <h1 className="header-title">{title}</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
