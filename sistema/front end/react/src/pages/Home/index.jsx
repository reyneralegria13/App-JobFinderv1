import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Home() {
  return (
    
    <div>
      <header class="header">
      <div class="logo">JobFinder</div>
        
    </header>

    <main class="container">
      <div class="content">
        <h1>Bem-vindo ao JobFinder</h1>
        <p>
          No JobFinder, conectamos você com as melhores oportunidades de emprego
          em diversas áreas. Nossa plataforma é fácil de usar e oferece
          ferramentas poderosas para ajudar você a encontrar o emprego dos seus
          sonhos.
        </p>
        <div class="button-group">
          <a
            href="./registro.html"
            class="button primary-button"
            >Cadastre-se</a
          >
          <a 
            href="../Entrar/Entrar.html" 
            class="button secondary-button"
            >Entrar</a>
        </div>
      </div>
      <div class="hero-image">
        <img
          src="./img/img_principal.jpg"
          alt="Pessoas trabalham em um ambiente de escritório moderno"
        />
      </div>
      </main>
    </div>
  )
}

export default Home
