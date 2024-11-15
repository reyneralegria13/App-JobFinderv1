const express = require("express");
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

//rota para recuperação de senha
router.get('/recuperar_senha', (req, res) => {
  res.render('fun/esqueciSenha', {
    title: 'Recuperar Senha',
    style: 'esqueciSenha.css'
  });
});


// outras rotas
router.get('/empresas', getEmpresas);
router.get("/empresa/:id", getEmpresa);
router.post("/regEmpresa", createEmpresa);
router.put("/upEmpresa/:id", updateEmpresa);
router.delete("/delEmpresa/:id", deleteEmpresa);

module.exports = router;
