import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
const statusClasses = {
  'pending': 'status-pendente',
  'in progress': 'status-andamento',
  'resolved': 'status-resolvido',
  'rejected': 'status-rejeitado',
};

function ReportCard({ report }) {
  const { user } = useAuth();
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
      {user?.role === "admin" && (
        <Link to={`/reportmanage/${report.id}`} className="details-button">
          Detalhes
        </Link>
      )}
  </article>
  );
}
export default ReportCard;
