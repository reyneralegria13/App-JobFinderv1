import React from 'react';
import './styleReg.css';

function CompanyRegistration() {
  return (
    <div>
      <header className="header">
        <div className="navigation">
          <button 
            className="back-button" 
            id="backButton" 
            onClick={() => window.location.href = '../registro.html'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="logo">Cadastro de Empresa</div>
        <button className="help-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
          </svg>
        </button>
      </header>

      <main className="container">
        <p className="form-description">
          Preencha as informações básicas da sua empresa para criar seu cadastro.
          Você poderá complementar as informações posteriormente.
        </p>

        <form id="companyForm">
          <div className="form-group">
            <label className="form-label">Nome da Empresa*</label>
            <input
              type="text"
              className="form-input"
              placeholder="Digite o nome da sua empresa"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">CNPJ*</label>
            <input
              type="text"
              className="form-input"
              placeholder="XX.XXX.XXX/XXXX-XX"
              required
            />
            <span className="form-helper">Digite apenas números</span>
          </div>

          <div className="form-group">
            <label className="form-label">Email Corporativo*</label>
            <input
              type="email"
              className="form-input"
              placeholder="email@suaempresa.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefone Comercial*</label>
            <input
              type="tel"
              className="form-input"
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio da Empresa</label>
            <textarea
              className="form-input"
              placeholder="Descreva brevemente sua empresa..."
            ></textarea>
            <span className="form-helper">
              Fale um pouco sobre a história e valores da sua empresa
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Site da Empresa</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://www.suaempresa.com"
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="button button-secondary"
              id="cancelButton"
            >
              Cancelar
            </button>
            <button type="submit" className="button button-primary">Salvar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CompanyRegistration;
