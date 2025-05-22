import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Reportmanage from '../pages/reportManage.jsx';
import Home from '../pages/Home';
import ReportMain from '../pages/reportmain.jsx';
import ReportIssueForm from '../pages/reportCreate.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ReportMain" element={<ReportMain />} />
        <Route path="/Reportmanage" element={<Reportmanage />} />
        <Route path="/ReportIssueForm" element={<ReportIssueForm />} />
      </Routes>
    </Router>
  );
}
export default App;
