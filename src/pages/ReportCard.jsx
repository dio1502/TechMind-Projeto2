import React from 'react';

const statusClasses = {
  'pendente': 'status-pendente',
  'em andamento': 'status-andamento',
  'resolvido': 'status-resolvido',
  'rejeitado': 'status-rejeitado',
};

function ReportCard({ report, onPreview }) {
  return (
    <article className="report-card">
      <div className="report-header">
        <h2 ClassName="report-title">Report #{report.id}</h2>
        <span className={`report-status ${statusClasses[report.status]}`}>
          {report.status}
        </span>
      </div>
      <p className="report-summary">{report.subject}</p>
      <div className="report-meta">
        <time dateTime={report.date}>{report.date}</time>
        <span>{report.author}</span>
      </div>
      <div className="report-actions">
        <button onClick={() => onPreview(report.id)} className="btn-preview">
          Detalhes
        </button>
      </div>
    </article>
  );
}
export default ReportCard;
