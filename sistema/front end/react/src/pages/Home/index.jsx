import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import imagem from '../../img/img_principal.jpeg'

function Home() {
  return (
    
    <div className='body'>
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
          <Link
            to= {'/escolherCargo'}
            class="button primary-button"
            >Cadastre-se</Link>

          <Link to={'/candidato/login'} className='button secondary-button'>Entrar</Link>
        </div>
      </div>
      <div class="hero-image">
        <img
          src= {imagem}
          alt="Pessoas trabalham em um ambiente de escritório moderno"
        />
      </div>
      </main>
    </div>
  )
}

export default Home
