import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const ForgotPasswordNext = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">Make Selection</h2>
            <form action="#" className="signup-form">
                {/* Selecionar a faorma que quer repor a palavra passe, por exemplo via email*/}
            <p>Select wich contact detail should we use to reset your password</p>
                <button type="submit" className="signup-button">Next</button>
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login" className="signup-link">Log in</Link>
            </p>
        </div>
    )
}
export default ForgotPasswordNext;