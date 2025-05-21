import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../Pages/LogIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordSelection from '../subpages/ForgotPasswordSelection';
import ForgotPasswordNewCredentials from '../subpages/ForgotPasswordNewCredentials';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<ForgotPassword />} />
        <Route path="/password-selection" element={<ForgotPasswordSelection />} />
        <Route path="/forgotpassword-newcredentials" element={<ForgotPasswordNewCredentials />} />
      </Routes>
    </Router>
  );
}
export default App;
