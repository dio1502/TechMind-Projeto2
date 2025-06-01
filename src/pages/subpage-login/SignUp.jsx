import InputField from "../../components/InputField";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="signup-container">
            <h2 className="form-title">Sign Up</h2>
            <form action="#" className="signup-form"> {/* Enviar para a pagina home se der Sign Up*/}
                <InputField type="email" placeholder="Email address" icon="mail" />
                <InputField type="password" placeholder="Password" icon="lock" />
                <InputField type="number" placeholder="Apartment Number"/>
                <Link to="/login"><button type="submit" className="signup-button">Sign Up</button></Link> {/*Criar o popup se a conta for criada com secesso */}
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}
export default SignUp;