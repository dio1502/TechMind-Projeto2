import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import ReportMain from '../pages/ReportMain.jsx';
import Reportmanage from '../pages/Reportmanage.jsx';
import ReportIssueForm from '../pages/reportCreate.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reportMain" element={<ReportMain />} />
        <Route path="/reportmanage/:id" element={<Reportmanage />} />
        <Route path="/reportmanage/" element={<Navigate to="/reportMain" replace />} />
        <Route path="/reportissueForm" element={<ReportIssueForm />} />
      </Routes>
    </Router>
  );
}
export default App;
