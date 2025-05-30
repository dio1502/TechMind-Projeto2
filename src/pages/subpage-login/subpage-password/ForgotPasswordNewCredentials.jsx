import InputField from "../../../components/InputField1";
import { Link } from "react-router-dom";

const ForgotPasswordNewCredentials = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">New Credentials</h2>
            <form action="#" className="signup-form">
                <div className="Contact-detail">
                    <p>Your identity has been verified. Set your new password</p>
                </div>
                <br></br>
                
                <InputField type="password" placeholder="New Password" icon="lock" />
                <InputField type="password" placeholder="Confirm Password" icon="lock" />
                <Link to="/login"><button type="submit" className="back-button">Update</button></Link>
            </form>
        </div>
    )
}
export default ForgotPasswordNewCredentials;