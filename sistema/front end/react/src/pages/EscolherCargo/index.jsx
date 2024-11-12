import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../EscolherCargo/style.css'

function EscolherCargo() {
  const [usertype, setuserType] = useState('candidate')
  const navigate = useNavigate()

  const onClickSubmit =(e) => {
    e.preventDefault()
    if(usertype === 'candidate') {
     navigate('/candidato/login')
    } else {
     navigate('/empregador/login')
    }
  }

    return (
    <div className='body'>
      <header class="header">
        <div class="navigation">
          <button class="back-button" id="botaovoltar" onClick={() => navigate('/')}>
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
        <div class="logo">JobFinder</div>
      </header>

      <main class="container">
        <h1>Registro</h1>
        <p>
          Bem-vindo ao JobFinder! Por favor, escolha se você está procurando um
          emprego ou se você é um empregador à procura de candidatos. Esta
          informação nos ajudará a personalizar sua experiência.
        </p>

        <form id="register-form">
          <div class="options">
            <label class="option selected">
              <input type="radio" name="user-type" value="candidate" checked />
              <div class="option-content">
                <div class="option-title">Candidato</div>
                <div class="option-description">Estou procurando um emprego</div>
              </div>
            </label>

            <label class="option">
              <input type="radio" name="user-type" value="employer" />
              <div class="option-content">
                <div class="option-title">Empregador</div>
                <div class="option-description">Estou procurando candidatos</div>
              </div>
            </label>
          </div>

          <button type="submit" class="continue-button" onClick={onClickSubmit}>Continuar</button>
        </form>
      </main>
    </div>     
                   
    )
}
export default EscolherCargo