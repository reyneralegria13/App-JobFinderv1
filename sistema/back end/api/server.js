const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const empresaRoutes = require('./routes/empresaRoutes')
const path = require('path')
const {engine} = require('express-handlebars')

//uso
const app = express()
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors('http://localhost:5173/'))
//app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//rotas
app.use("/", empresaRoutes)

//configuração das views engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    extname: "hbs", //index.hbs
    layoutDir: path.join(__dirname, 'views/Home'),
    defaultLayout: 'Home.hbs'
}))
app.set('view engine', '.hbs')

// rota principal
app.get("/",  (req, res) => {
    res.send("Bem vindo ao meu servidor");
});

// conexão com o banco e com o servidor
connectDb()
.then(data => {
    console.log(' >> Banco de dados conectado com sucesso:\n')
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 5000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))
