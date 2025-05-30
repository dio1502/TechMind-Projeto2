import InputField from "../../../components/InputField1";
import { Link } from "react-router-dom";

const ForgotPasswordSelection = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">Make Selection</h2>
            <form action="#" className="signup-form">
                
                <div className="Contact-detail">
                    <p>Select wich contact detail should we use to reset your password.</p>
                </div>
                
                <Link to="/forgotpassword-newcredentials"><button type="submit" className="signup-button">Use Email</button></Link>
                <Link to="/password"><button type="submit" className="back-button">Back</button></Link>
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}
export default ForgotPasswordSelection;