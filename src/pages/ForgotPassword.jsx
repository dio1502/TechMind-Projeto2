import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">Forget Password</h2>
            <form action="#" className="signup-form">
                <InputField type="email" placeholder="Email address" icon="mail" />
                <button type="submit" className="signup-button">Next</button>
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login" className="signup-link">Log in</Link>
            </p>
        </div>
    )
}
export default ForgotPassword;