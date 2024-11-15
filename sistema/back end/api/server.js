const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const empresaRoutes = require('./src/routes/empresaRoutes');

const path = require('path')
const {engine} = require('express-handlebars')

//uso
const app = express()
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors('http://localhost:5173/'))
//app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(empresaRoutes);


app.use(express.static(path.join(__dirname, 'src/assets')));
app.use('/img', express.static(path.join(__dirname, 'src/img')));
//rotas
//app.use("/job", empresaRoutes);
//console.log("Middleware de rotas '/job' foi carregado.");


//configuração das views engine
app.set('views', path.join(__dirname, 'src/views'))

app.engine('.hbs', engine({
    extname: "hbs", //index.hbs
    layoutDir: path.join(__dirname, 'src/views/layouts'),
    defaultLayout: 'main.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
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
        console.log('Servidor rodando na porta 3000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))