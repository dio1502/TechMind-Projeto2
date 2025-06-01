import React from 'react';
import { Link } from 'react-router-dom';

const statusClasses = {
  'pendente': 'status-pendente',
  'em andamento': 'status-andamento',
  'resolvido': 'status-resolvido',
  'rejeitado': 'status-rejeitado',
};

function ReportCard({ report }) {
  return (
  <article className="report-card">
      <div className="report-header">
        <h2 className="report-title">Report #{report.id}</h2>
        <span className={`report-status ${statusClasses[report.status]}`}>
          {report.status}
        </span>
      </div>
      <p className="report-summary">{report.subject}</p>
      <div className="report-meta">
        <time dateTime={report.date}>{report.date}</time>
        <span>{report.author}</span>
      </div>
      <Link to={`/reportmanage/${report.id}`} >
        Detalhes
      </Link>
  </article>
  );
}
export default ReportCard;
