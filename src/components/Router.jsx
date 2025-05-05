import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../LogIn';
import SignUp from '../SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Vai diretamente para o login, a raiz */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
