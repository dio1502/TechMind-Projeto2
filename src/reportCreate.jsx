
const ReportIssueForm = () => {
  return (
    <div  className="Page-container">
    <div class="link-main" ><img src="dist/left-arrow.svg" width="1.5%" height="1.5%"/><label>Menu Principal</label></div>
    <div className="report-container">
      <h2>Reportar Problema</h2>
      <form  className="report-form">
        <div className="field-group">
          <label>
            Assunto
          </label>
          <input type="text" required placeholder="Descreva brevemente o problema"/>
        </div>

        <div class="field-group">
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

        <div class="field-group">
          <label>
            Descrição
          </label>
          <textarea required rows={4} placeholder="Detalhe o problema com o máximo de informações"/>
        </div>

        <div class="field-group">
          <label>
            Anexo (opcional)
          </label>
          <input type="file"/>
        </div>

        <div class="field-group">
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