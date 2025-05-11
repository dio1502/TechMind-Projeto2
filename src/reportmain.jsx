const ReportMain = () => {
    return (
<div class="report-page">
        <a href="/Gestao-reports" className="link-main">
            <img src="./dist/left-arrow.svg" alt="Voltar" />
            <span>Gestao reports</span>
        </a>

    <div class="reports-list ">
      <article class="report-card">
        <div class="report-header">
          <h2 class="report-title">Report #00123</h2>
          <span class="report-status pending">Pendente</span>
        </div>
        <p class="report-summary">
          Vazamento de água no banheiro do 2º andar. Relatado pelo morador João Silva.
        </p>
        <div class="report-meta">
          <time datetime="2025-05-07">07/05/2025</time>
          <span class="report-author">João Silva</span>
        </div>
        <div class="report-actions">
          <button class="btn-preview" data-report-id="00123">Detalhes</button>
        </div>
      </article>

    </div>

    /*-- Modal de preview (inicialmente oculto) -*/
    <div id="previewModal" class="modal hidden">
      <div class="modal-content">
        <button class="modal-close">×</button>
        <h2 class="modal-title">Detalhes do Report #<span id="modalReportId"></span></h2>
        <div class="modal-body">
          <p><strong>Assunto:</strong> Vazamento de água no banheiro</p>
          <p><strong>Descrição:</strong> Água saindo pelo ralo do chuveiro mesmo com registro fechado. Possível defeito no mecanismo interno.</p>
          <p><strong>Categoria:</strong> Hidráulica</p>
          <p><strong>Status:</strong> Pendente</p>
          <p><strong>Data:</strong> 07/05/2025</p>
          <p><strong>Morador:</strong> João Silva</p>
        </div>
        <div class="modal-footer">
          <button class="btn-approve">Aprovar</button>
          <button class="btn-reject">Rejeitar</button>
        </div>
      </div>
    </div>
</div>
)} 
export default ReportMain;