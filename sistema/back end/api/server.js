const express = require('express')
const connectDb = require('./db')

//uso
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// rota principal
app.get("/",  (req, res) => {
    res.send("Bem vindo ao meu servidor");
});

// conexão com o banco e com o servidor
connectDb()
.then(data => {
    console.log(' >> Banco de dados conectado com sucesso:\n')
    app.listen(5000, () => {
        console.log('Servidor rodando na porta 5000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))
