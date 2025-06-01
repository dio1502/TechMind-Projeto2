import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Reportmanage from '../pages/reportManage.jsx';
import Home from '../pages/Home';
import ReportMain from '../pages/reportmain.jsx';
import ReportIssueForm from '../pages/reportCreate.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reportMain" element={<ReportMain />} />
        <Route path="/reportmanage/:id" element={<Reportmanage />} />
        <Route path="/reportissueForm" element={<ReportIssueForm />} />
      </Routes>
    </Router>
  );
}
export default App;
