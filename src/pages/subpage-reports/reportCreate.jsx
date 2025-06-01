import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const ReportIssueForm = () => {
  const navigate = useNavigate();

  // Estado para armazenar o próximo ID a ser usado
  const [reportId, setReportId] = useState("");
  // Controla se estamos carregando o GET /reports
  const [isLoadingId, setIsLoadingId] = useState(true);
  // Status inicial sempre “pendente”
  const [status] = useState("pendente");

  // Estados do formulário
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [unit, setUnit] = useState("");
  const [attachment, setAttachment] = useState(null); // armazena o File
  const [error, setError] = useState("");

  // 1) Ao montar o componente, buscar todos os relatórios para calcular ID incremental
  useEffect(() => {
    const fetchExistingReports = async () => {
      try {
        const res = await fetch("http://localhost:4000/reports");
        if (!res.ok) {
          throw new Error("Erro ao buscar relatórios existentes");
        }
        const reports = await res.json();
        if (!Array.isArray(reports) || reports.length === 0) {
          setReportId(1);
        } else {
          const maxId = reports.reduce((max, item) => {
            const currentId = typeof item.id === "number" ? item.id : parseInt(item.id, 10);
            return currentId > max ? currentId : max;
          }, 0);
          setReportId((maxId + 1).toString())
        }
      } catch (err) {
        console.error(err);
        setReportId(1);
      } finally {
        setIsLoadingId(false);
      }
    };

    fetchExistingReports();
  }, []);

  // 2) handleSubmit — monta FormData e envia ao servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
      const body = {
        id: reportId,
        status,
        subject,
        category,
        description,
        author,
        unit,
        date: new Date().toISOString().split("T")[0],
      };

    // Validação dos campos obrigatórios
    if (
      !subject.trim() ||
      !category ||
      !description.trim() ||
      !author.trim() ||
      !unit.trim()
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Se o ID (GET) ainda estiver carregando, bloqueia
    if (isLoadingId) {
      setError("Aguarde o carregamento do próximo ID antes de enviar.");
      return;
    }

    setError("");

    // Monta FormData incluindo o arquivo (se houver)
    const formData = new FormData();
    formData.append("id", reportId);
    formData.append("status", status);
    formData.append("subject", subject);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("unit", unit);
    // Podemos incluir a data no front ou deixar o servidor preencher
    const today = new Date().toISOString().split("T")[0];
    formData.append("date", today);

    // Se o usuário selecionou um arquivo, adiciona ao FormData
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      // Envia FormData (multipart/form-data) ao nosso endpoint Express
      const response = await fetch("http://localhost:4000/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });


      if (!response.ok) {
        // Se o servidor retornar erro (ex.: ID duplicado), parse do JSON
        const errorJson = await response.json().catch(() => null);
        const msg = (errorJson && errorJson.message) || "Falha ao enviar o relatório.";
        throw new Error(msg);
      }

      const createdReport = await response.json();
      alert(`Problema reportado com sucesso!\nID gerado: ${createdReport.id}\n` + (createdReport.attachmentUrl? `Anexo salvo em: http://localhost:4000${createdReport.attachmentUrl}`: ""));

      // Após sucesso, redireciona
      navigate("/reportmain");
    } catch (err) {
      console.error(err);
      setError(err.message || "Ocorreu um erro inesperado.");
    }
  };

  // 3) Captura arquivo selecionado no input type="file"
  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setAttachment(file);
  };


  return (
    <div  className="Page-container">
        <Link to="/homepage" className="link-main">
          <img src="../../left-arrow.svg" alt="Voltar" />
          <span>Menu Principal</span>
        </Link>

      <div className="report-container">
        <h2>Reportar Problema</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form  className="report-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="field">
            <label htmlFor="subject">
              Assunto
            </label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="Descreva brevemente o problema"/>
          </div>

          <div className="field">
            <label htmlFor="author">
              Nome
            </label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required placeholder="Nome"/>
          </div>

          <div className="field">
            <label htmlFor="Unit">
              Nº Apartamento
            </label>
            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} required placeholder="Nº Apartamento"/>
          </div>

          <div className="field">
            <label>
              Categoria
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required >
              <option value="">Selecione uma categoria</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div class="field">
            <label>
              Descrição
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1000} required rows={4} placeholder="Detalhe o problema com o máximo de informações"/>
          </div>

          <div class="field">
            <button type="submit">
              Enviar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
} 
export default ReportIssueForm;