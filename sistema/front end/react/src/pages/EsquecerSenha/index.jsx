import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function EsquecerSenha() {
  return (
    <div class='body'>  
      <div class="container">
      <h1>Esqueceu a Senha</h1>
      <p>
        Digite o endereço de e-mail associado à sua conta e enviaremos
        instruções para redefinir sua senha.
      </p>
      <form>
        <label for="email">Endereço de Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="exemplo@email.com"
          required
        />
        <button type="submit">Enviar Link de Redefinição</button>
      </form>
      <a href="./Entrar.html" class="login-link">Voltar ao Login</a>
    </div>
    </div>

  )
}
export default EsquecerSenha