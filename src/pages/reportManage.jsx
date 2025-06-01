import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Reportmanage = () => {
  const { id } = useParams();                // pega o ":id" da URL
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Busca o report individual no json-server (ou outro backend)
    fetch(`http://localhost:4000/reports/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Report com id ${id} não encontrado`);
        }
        return res.json();
      })
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar report:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="report-page">
        <p>Carregando detalhes do report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-page">
        <p >{error}</p>
        <Link to="/reportmain" className="link-main">
            <img src="./dist/left-arrow.svg" alt="Voltar"/>
            <span>Voltar para lista de reports</span>
        </Link>
      </div>
    );
  }
 
  return (
    <div className="report-page">
      <Link to="/reportmain" className="link-main">
        <img src="/dist/left-arrow.svg" alt="Voltar" />
        <span>Gestão de Reports</span>
      </Link>

      <div className="report-management">
        <h1>Gestão de Report #{report.id}</h1>
        <form>
          <div className="field-group">
            <label>Nome:</label>
            <output>{report.author}</output>
          </div>
          <div className="field-group">
            <label>Nº de Processo:</label>
            <output>{report.id}</output>
          </div>
          <div className="field-group">
            <label>Apartamento:</label>
            <output>{report.unit}</output>
          </div>
          <div className="field-group">
            <label>Data:</label>
            <output>{report.date}</output>
          </div>
          <div className="field-group">
            <label>Assunto:</label>
            <output>{report.subject}</output>
          </div>
            <div className="field-group">
            <label>Categoria:</label>
            <output>{report.category}</output>
          </div>
          <div className="field-group">
            <label>Descrição:</label>
            <textarea readOnly rows={4}>
              {report.description}
            </textarea>
          </div>
          <div className="field-group">
            <label>Status:</label>
            <output>{report.status}</output>
          </div>
          <div className="actions">
            <label>Ações:</label>
            <button type="button" className="btn-approve">
              Resolvido
            </button>
            <button type="button" className="btn-reject">
              Rejeitar
            </button>
            <button type="button" className="btn-resolve">
              Em andamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
export default Reportmanage;