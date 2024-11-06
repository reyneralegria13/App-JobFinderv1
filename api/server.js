const express = require('express') 
const mongoose = require('mongoose')
const connectDb = require('./db')

//const bookRoutes = require('./controllers/book.controller')

//uso
const app = express()
//app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.json())

// rotas
//app.use('/job', bookRoutes)

connectDb()
.then(data => {
    console.log(' >> Banco de dados conectado com sucesso:\n')
    app.listen(5000, () => {
        console.log('Servidor rodando na porta 5000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))

// JobFinderDB
// WiMuOlRTRqOZUQ5o