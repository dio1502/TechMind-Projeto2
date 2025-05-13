import InputField from "../components/InputField.jsx";
import { Link } from "react-router-dom";
import '../components/Router.jsx'

const LogIn = () => {
  return (
    <div className="login-container">
      <h2 className="form-title">Log in</h2>
      <form action="#" className="login-form"> {/* Enviar para a pagina home se der log in*/}
        <InputField type="email" placeholder="Email address" icon="mail" />
        <InputField type="password" placeholder="Password" icon="lock" />
        <InputField type="number" placeholder="Apartment Number"/>
        <p className="forgot-password">
        <Link to="/password" className="password-link">Forgot password? </Link>
        </p>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
      </p>
    </div>
  )
}
export default LogIn;

