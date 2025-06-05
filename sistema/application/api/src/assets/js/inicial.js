const token = localStorage.getItem('token'); // Recupera o token armazenado após o login

if (!token) {
    console.error('Token não encontrado. Faça login novamente.');
    alert('Você precisa fazer login para acessar esta página.');
    window.location.href = '/login'; // Redireciona para a página de login
}

fetch('/inicial', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Envia o token no formato Bearer <token>
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Acesso negado'); // Lida com erros da API
        }
        return response.json(); // Ou response.text() dependendo da resposta esperada
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        // Exibe os dados ou processa conforme necessário
    })
    .catch(err => {
        console.error('Erro ao acessar a página inicial:', err);
        alert('Erro de autenticação. Por favor, faça login novamente.');
        window.location.href = '/login';
    });