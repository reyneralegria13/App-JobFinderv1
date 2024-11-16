// Dentro de uma requisição ao backend para /inicial
const token = localStorage.getItem('token');
fetch('/inicial', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,  // Passando o token como 'Bearer Token'
  },
})
.then(response => response.text())  // ou response.json() dependendo do retorno
.then(data => {
  console.log(data);
})
.catch(err => console.error('Erro ao acessar página inicial:', err));
