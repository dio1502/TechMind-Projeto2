import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordNext from '../subpages/ForgotPasswordNext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<ForgotPassword />} />
        <Route path="/passwordnext" element={<ForgotPasswordNext />} />
      </Routes>
    </Router>
  );
}

export default App;
