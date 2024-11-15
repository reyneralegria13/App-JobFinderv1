const express = require("express");
//autenticação de senha
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const Candidato = require("../models/candidatoModel");
const { getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } = require("../contrroller/empresaController");

// rota para a página home
router.get('/home', (req, res) => {
    res.render('fun/home', {
        title: 'home',
        style: 'home.css' 
    });
});

//rota para a página para escolher cargo
router.get('/cargo', (req, res) => {
  res.render('fun/escolherCargo', {
    title: 'Escolher Cargo',
    style: 'escolherCargo.css'
  });
});

//rota para a página de cadastro de candidato
router.get('/cadCandidato', (req, res) => {
  res.render('fun/reg_candidato', {
    title: 'Registro de Candidato',
    style: 'reg_candidato.css'
  });
});
//validação de cadastro de candidato
router.post('/cadCandidato', async (req, res) => {
  const { nome, cpf, email, senha, telefone, educacao, qualificacao, cursos, descricao, habilidadesTecnicas, idiomas } = req.body;

  //Da erro ao tentar usar isso. Tô com preguiça de saber o pq.
  /*if(!name){
    return res.status(422).json({mgs:"O nome é obrigatório!"})
  }*/
  if(!cpf){
    return res.status(422).json({mgs:"O cpf é obrigatório!"})
  }
  if(!telefone){
    return res.status(422).json({mgs:"O telefone é obrigatório!"})
  }
  if(!email){
    return res.status(422).json({mgs:"O email é obrigatório!"})
  }
  if(!senha){
    return res.status(422).json({mgs:"A senha é obrigatório!"})
  }

  //Caso seja usado o "confirmar senha"
  /*if(senha != confirmarSenha){
      return res.status(422).json({mgs:"As senhas não confere!"})
  }*/

  //Ver se o usuário existe
  const userExiste = await Candidato.findOne({email: email})

  if(userExiste){
    return res.status(422).json({mgs:"Email já utilizado no sistema. Por favor, escolher outro."})
  }

  //proteção de senha 
  const salt = await bcrypt.genSalt(12)
  const senhaHash = await bcrypt.hash(senha, salt)



  try {
    const novoCandidato = new Candidato({
      nome,
      cpf,
      email,
      senha,
      telefone,
      educacao,
      qualificacao,
      cursos,
      descricao,
      habilidadesTecnicas,
      idiomas
    });
    // leva para o banco de dados
    await novoCandidato.save();

    // ao terminar, volta pra a home
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar o candidato.");
  }
});

//rota para a página de cadastro de empresa
router.get('/cadEmpresa', (req, res) => {
  res.render('fun/reg_empresa', {
    title: 'Registro de Empresa',
    style: 'reg_empresa.css'
  });
});

//rota para validação de cadatro de candidato
router.post('/cadEmpresa', async (req, res) => {
  const { nome, email, cnpj, fone, bio, site } = req.body;

  try {
    const novaEmpresa = new Empresa({
      nome,
      email,
      cnpj,
      fone,
      bio,
      site
    });
    await novaEmpresa.save();

    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar a empresa.");
  }
});

//rota para a pagina de login
router.get('/login', (req, res) => {
  res.render('fun/login', {
    title: 'Login',
    style: 'login.css'
  });
});

//rota para validação de login
router.get('/login', async (req, res) => {
  const {email, senha} = req.body

  //validação inicial
  if(!email){
    return res.status(422).json({mgs:"O email é obrigatório!"})
  }
  if(!senha){
    return res.status(422).json({mgs:"A senha é obrigatório!"})
  }

  //ver se o usuário é encontrado no banco
  const user = await Candidato.findOne({email: email})

  if(!user){
    return res.status(404).json({mgs:"Usuário não encontrado!"})
  }

  //conferir senha do usuário
  const checarSenha = await bcrypt.compare(senha, user.senha);

  if(!checarSenha){
    return res.status(422).json({mgs:"Senha inválida!"})
  }

  //chegar o token
  try{
    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )

    res.status(200).json({msg:"Autenticação realizada com sucesso", token})
  } catch (err){
    console.erro(error)
    res.status(500).send("Erro ao validar token")
  }
});

//rota para recuperação de senha
router.get('/recuperar_senha', (req, res) => {
  res.render('fun/esqueciSenha', {
    title: 'Recuperar Senha',
    style: 'esqueciSenha.css'
  });
});


//Rota privada do perfil do usuário para testes de autenticação
router.get("/user/:id", checarToken, async (req, res) => {
  const id = req.params.id

  //checar se o usuário existe
  const user = await Candidato.findById(id, '-senha')

  if(!user){
    return res.status(404).send("Usuário não encontrado")
  }

  res.status(200).json({user})
})

//função para validar o token
function checarToken(res, req, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if(!token){
    return res.status(401).json({msg: 'Acesso negado!'})
  }
  try{
    const secret =process.env.SECRET
    jwt.verify(token, secret)

    next()
  } catch(error){
    res.status(400).json({msg:"token inválido!"})
  }
}


// outras rotas
router.get('/empresas', getEmpresas);
router.get("/empresa/:id", getEmpresa);
router.post("/regEmpresa", createEmpresa);
router.put("/upEmpresa/:id", updateEmpresa);
router.delete("/delEmpresa/:id", deleteEmpresa);

module.exports = router;
