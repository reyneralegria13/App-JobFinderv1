import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Home() {
  return (
      <div className='body'>
        <header class="header">
      <div class="navigation">
        <button class="back-button" id="backButton" onclick="window.location.href = '../login/registro.html';">
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
        <div class="logo">Cadastro de Candidato</div>
      
      <div class="help-container">
        <button class="help-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
          </svg>
        </button>
      </div>
      
    </header>

    <div class="container">
      
      <form id="candidateForm">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome" required />
        </div>

        <div class="form-group">
          <label for="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" required />
        </div>

        <div class="section-label">Informações Pessoais</div>

        <div class="form-group">
          <label for="educacao">Educação</label>
          <select id="educacao" name="educacao" required>
            <option value="">Selecione</option>
            <option value="medio">Ensino Médio</option>
            <option value="superior">Ensino Superior</option>
            <option value="pos">Pós-Graduação</option>
            <option value="mestrado">Mestrado</option>
            <option value="doutorado">Doutorado</option>
          </select>
        </div>

        <div class="form-group">
          <label for="qualificacoes">Qualificações</label>
          <input
            type="text"
            id="qualificacoes"
            name="qualificacoes"
            placeholder="Ex: Certificação PMP"
          />
        </div>

        <div class="form-group">
          <label for="cursos">Cursos</label>
          <input
            type="text"
            id="cursos"
            name="cursos"
            placeholder="Ex: Curso de Inglês"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Experiência em gestão de projetos, com foco em metodologias ágeis e liderança de equipes multidisciplinares."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input type="tel" id="telefone" name="telefone" />
        </div>

        <div class="form-group">
          <label for="habilidades">Habilidades Técnicas</label>
          <input
            type="text"
            id="habilidades"
            name="habilidades"
            placeholder="Ex: Python, JavaScript, Excel"
          />
        </div>

        <div class="form-group">
          <label for="idiomas">Idiomas</label>
          <input
            type="text"
            id="idiomas"
            name="idiomas"
            placeholder="Ex: Inglês - Avançado, Espanhol - Intermediário"
          />
        </div>

        <button type="submit">Continuar</button>
      </form>
    </div>

      </div>
  )
}
export default Home