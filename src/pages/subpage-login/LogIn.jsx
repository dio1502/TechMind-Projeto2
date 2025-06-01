import InputField from "../../components/InputField1.jsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import '../../components/Router.jsx';
import '../../css/Login.css'

const LogIn = () => {
  const { login } = useAuth();         
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [apartment, setApartment] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    
    const ok = login(email, password);
    if (!ok) {
      setError("Credenciais inválidas.");
    }
    
  };
   return (
    <div className="login-container">
      <h2 className="form-title">Log in</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Email address"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          type="number"
          placeholder="Apartment Number"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />

        <p className="forgot-password">
          <Link to="/password">Forgot password?</Link>
        </p>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};
export default LogIn;

