import { Link } from "react-router-dom";

const Reportmanage = () => {
    return (
    <div class="report-page">
        <a href="/Gestao-reports" className="link-main">
            <img src="./dist/left-arrow.svg" alt="Voltar" />
            <span>Gestao reports</span>
        </a>
        
        <div class="report-management">
            <h1>Gestão de Reports</h1>
            <form>
                <div className="field-group">
                    <label>Nome:</label>
                    <output placeholder="Nome"></output>
                </div>
                <div className="field-group">
                    <label>Nº de Processo:</label>
                    <output placeholder="Numero de Processo"></output>
                </div>
                <div className="field-group">
                    <label>Apartamento:</label>
                    <output placeholder="Apartamento"></output>
                </div>
                <div className="field-group">
                    <label>Data:</label>
                    <output placeholder="Data"></output>
                </div>
                <div className="field-group">
                    <label>Assunto:</label>
                    <output placeholder="Assunto"></output>
                </div>
                <div className="field-group">
                    <label>Descrição:</label>
                    <textarea placeholder="Descrição" readOnly></textarea>
                </div>
                <div className="field-group">
                    <label>Status:</label>
                    <output placeholder="Estado"></output>
                </div>
                <div className="actions">
                <label>Ações:</label>
                <button type="button" class="btn-approve">Resolvido</button>
                <button type="button" class="btn-reject">Rejeitar</button>
                <button type="button" class="btn-reject">Em andamento</button>
                </div>
            </form>
        </div>
    </div>
)} 
export default Reportmanage;