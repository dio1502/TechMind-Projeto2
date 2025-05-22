import InputField from "../components/InputField1.jsx";
import { Link } from "react-router-dom";
import '../components/Router.jsx';
import '../css/Login.css'

const LogIn = () => {
  return (
    <div className="login-container">
      <h2 className="form-title">Log in</h2>
      <form action="#" className="login-form">
        <InputField type="email" placeholder="Email address" icon="mail" />
        <InputField type="password" placeholder="Password" icon="lock" />
        <InputField type="number" placeholder="Apartment Number"/>
        <p className="forgot-password">
        <Link to="/password">Forgot password? </Link>
        </p>
        <Link to="/announcement-home"><button type="submit" className="login-button">Log In</button></Link>
      </form>
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}
export default LogIn;

