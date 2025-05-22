import { Link } from "react-router-dom";

const ReportIssueForm = () => {
  return (
    <div  className="Page-container">
        <a href="/Menu-Principal" className="link-main">
          <img src="./dist/left-arrow.svg" alt="Voltar" />
          <span>Menu Principal</span>
        </a>
      <div className="report-container">
        <h2>Reportar Problema</h2>
        <form  className="report-form">
          <div className="field">
            <label>
              Assunto
            </label>
            <input type="text" required placeholder="Descreva brevemente o problema"/>
          </div>

          <div class="field">
            <label>
              Categoria
            </label>
            <select required >
              <option value="">Selecione uma categoria</option>
              <option value="eletrica">Elétrica</option>
              <option value="hidraulica">Hidráulica</option>
              <option value="limpeza">Limpeza</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div class="field">
            <label>
              Descrição
            </label>
            <textarea maxLength={1000} required rows={4} placeholder="Detalhe o problema com o máximo de informações"/>
          </div>

          <div class="field">
            <label>
              Anexo (opcional)
            </label>
            <input type="file"/>
          </div>

          <div class="field">
            <button type="submit" value={SubmitEvent("submit", options)}>
              Enviar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
} 
export default ReportIssueForm;