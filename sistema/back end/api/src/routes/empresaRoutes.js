const express = require("express");
const router = express.Router();
const { getCadastroEmpresa, getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } = require("../controller/empresaController");
const { getCadastroCandidato, getInicial, getPerfilCandidato, cadastroCandidato, realizarLogin } = require('../controller/candidatoController');
const { getCargo, getHome, getLogin, getRecuperarSenha } = require('../controller/telasController')
const checarToken = require('../controller/tokenController')

// Rotas das telas
router.get("/home", getHome);
router.get("/cargo", getCargo);
router.get("/login", getLogin);
router.get("/recuperar_senha", getRecuperarSenha);

// Rotas da empresa
router.get("/empresa/cadastrar", getCadastroEmpresa);
router.get("/empresa/:id", getEmpresa);
router.get("/empresas", getEmpresas);
router.post("/empresa/cadastrar", createEmpresa);
router.put("/empresa/editar/:id", updateEmpresa);
router.delete("/empresa/excluir/:id", deleteEmpresa);

// Rotas do candidato
router.get("/candidato/perfil/:id", checarToken, getPerfilCandidato);
router.get("/candidato/cadastrar", getCadastroCandidato);
router.post("/candidato/cadastrar", cadastroCandidato);
router.post("/candidato/login", realizarLogin);
router.get("/candidato/inicial", getInicial);

module.exports = router;