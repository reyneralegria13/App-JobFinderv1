import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Home() {
  return (
      <div className='body'>
           <header class="header">
      <div class="navigation">
        <button class="back-button" id="backButton" onclick="window.location.href = '../registro.html';">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="logo">Cadastro de Empresa</div>
      <button class="help-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
        </svg>
      </button>
    </header>

    <main class="container">
      <p class="form-description">
        Preencha as informações básicas da sua empresa para criar seu cadastro.
        Você poderá complementar as informações posteriormente.
      </p>

      <form id="companyForm">
        <div class="form-group">
          <label class="form-label">Nome da Empresa*</label>
          <input
            type="text"
            class="form-input"
            placeholder="Digite o nome da sua empresa"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">CNPJ*</label>
          <input
            type="text"
            class="form-input"
            placeholder="XX.XXX.XXX/XXXX-XX"
            required
          />
          <span class="form-helper">Digite apenas números</span>
        </div>

        <div class="form-group">
          <label class="form-label">Email Corporativo*</label>
          <input
            type="email"
            class="form-input"
            placeholder="email@suaempresa.com"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Telefone Comercial*</label>
          <input
            type="tel"
            class="form-input"
            placeholder="(XX) XXXXX-XXXX"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Bio da Empresa</label>
          <textarea
            class="form-input"
            placeholder="Descreva brevemente sua empresa..."
          ></textarea>
          <span class="form-helper"
            >Fale um pouco sobre a história e valores da sua empresa</span
          >
        </div>

        <div class="form-group">
          <label class="form-label">Site da Empresa</label>
          <input
            type="url"
            class="form-input"
            placeholder="https://www.suaempresa.com"
          />
        </div>

        <div class="button-group">
          <button
            type="button"
            class="button button-secondary"
            id="cancelButton"
          >
            Cancelar
          </button>
          <button type="submit" class="button button-primary">Salvar</button>
        </div>
      </form>
    </main>     
      </div>
  )
}
export default Home