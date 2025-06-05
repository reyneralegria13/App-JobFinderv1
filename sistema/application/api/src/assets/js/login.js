document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtém os valores do email e senha do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Envia as credenciais para o backend via fetch
    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo do conteúdo como JSON
            },
            body: JSON.stringify({
                email,
                senha
            }) // Envia os dados do login no corpo da requisição
        })
        .then(response => response.json()) // Processa a resposta como JSON
        .then(data => {
            if (data.token) {
                // Se o token for recebido, armazena no localStorage
                localStorage.setItem('token', data.token);
                // Redireciona o usuário para a página inicial protegida
                window.location.href = '/inicial';
            } else {
                // Caso contrário, exibe uma mensagem de erro
                alert('Login falhou. Verifique suas credenciais.');
            }
        })
        .catch(err => {
            // Trata erros de requisição
            console.error('Erro no login:', err);
            alert('Erro ao realizar o login. Tente novamente.');
        });
});