import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">Forget Password</h2>
            <form action="#" className="signup-form">
                <div class="Contact-detail">
                    <p>Provide your account's email for wich you want to reset your password</p>
                </div>
                <InputField type="email" placeholder="Email address" icon="mail" />
                <Link to="/password-selection"><button type="submit" className="next-button">Next</button></Link>
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}
export default ForgotPassword;