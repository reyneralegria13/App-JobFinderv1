// login.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém os valores do email e senha do formulário
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Envia as credenciais para o backend via fetch
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }) // Envia as credenciais como JSON
  })
    .then(response => response.json()) // Processa a resposta JSON do servidor
    .then(data => {
      if (data.token) {
        // Se o servidor retornar um token, armazena-o no localStorage
        localStorage.setItem('token', data.token);
        window.location.href = '/inicial'; // Redireciona para a página inicial
      } else {
        // Caso contrário, exibe uma mensagem de erro
        alert('Login falhou. Verifique as credenciais.');
      }
    })
    .catch(err => {
      // Exibe um erro caso algo dê errado com a requisição
      console.error('Erro no login:', err);
      alert('Erro ao realizar o login. Tente novamente.');
    });
});
