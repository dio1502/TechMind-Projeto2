import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ReportCard from '../subpage-reports/ReportCard.jsx'; // componete que exibe um report

const ReportMain = () => {
  const [reports, setReports] = useState([]);


  useEffect(() => {
    fetch('http://localhost:4000/reports')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar reports');
        return res.json();
      })
      .then(data => setReports(data))
      .catch(err => {
        console.error(err);
        // Aqui, se quiser, você pode exibir uma mensagem de erro no UI
      });
  }, []);

  return (
    <div className="report-page">
      <Link to="/homepage" className="link-main">
        <img src="../../../left-arrow.svg" alt="Voltar"/>
        <span>Home</span>
      </Link>

      <div className="reports-list">
        {reports.map(report => (
          <ReportCard
            key={report.id}
            report={report}
          />
        ))}
        {reports.length === 0 && (
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            Carregando ou nenhum report encontrado...
          </p>
        )}
      </div>
    </div>
  );
} 
export default ReportMain;