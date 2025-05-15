import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const ForgotPasswordSelection = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">Make Selection</h2>
            <form action="#" className="signup-form">
                {/* Selecionar a faorma que quer repor a palavra passe, por exemplo via email*/}
                <div class="Contact-detail">
                    <p>Select wich contact detail should we use to reset your password.</p>
                </div>
                {/*Criar um botao diferente no qual o utilizador clica para selecionar o metodo que pretende usar, no caso email*/}
                <button type="submit" className="signup-button">Use Email</button>
                <Link to="/password"><button type="submit" className="back-button">Back</button></Link>
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}
export default ForgotPasswordSelection;