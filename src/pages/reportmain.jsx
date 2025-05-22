import { Link } from "react-router-dom";
import reportsData from '../components/reports.json';
import React, { useState, useEffect } from 'react';
import ReportCard from '../pages/ReportCard.jsx'; // componete que exibe um report

const ReportMain = () => {
    const [reports, setReports] = useState([]);
    
    const [previewReport, setPreviewReport] = useState(null);
    useEffect(() => {
      // Em ambiente real, aqui faria fetch('/reports')
      setReports(reportsData);
    }, []);
 
    // Handler que recebe o id vindo do botão e define o report
    const handlePreview = (id) => {
    const report = reports.find(r => r.id === id);
    setPreviewReport(report);} 
    // aqui você pode abrir um modal ou navegar para /reports/:id
    return (
<div ClassNameName="report-page">

      <Link to="/reports/manage" className="link-main">
        <img src="/dist/left-arrow.svg" alt="Voltar" />
        <span>Gestão de Reports</span>
      </Link>

      <div className="reports-list">
        {reports.map(report => (
          <ReportCard
            key={report.id}
            report={report}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* Exemplo de modal de preview */}
      {previewReport && (
        <PreviewModal
          report={previewReport}
          onClose={() => setPreviewReport(null)}
        />
      )}
</div>
)} 
export default ReportMain;