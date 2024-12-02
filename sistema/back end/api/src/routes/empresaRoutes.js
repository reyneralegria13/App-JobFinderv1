const express = require("express");
const router = express.Router();
//const empresaController = require("../controller/empresaController");
const { getCadastroEmpresa, getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, dashboard } = require("../controller/empresaController");
const { getCadastroCandidato, getInicial, getPerfilCandidato, cadastroCandidato} = require('../controller/candidatoController');
const {realizarLogin, setSenha} =require('../controller/loginController');
const { getCargo, getHome, getLogin, getRecuperarSenha } = require('../controller/telasController')
//const checarToken = require('../controller/tokenController')
//Teste de autenticação de login
const { isAuthenticated, isEmpresa } = require('../middleware/auth');



// Rotas das telas
router.get("/home", getHome);
router.get("/cargo", getCargo);
//router.get("/login", login)
router.get("/login", getLogin);
//router.post("/login", login)
router.post("/login", realizarLogin);
router.get("/recuperar_senha", getRecuperarSenha);
//testes
router.get('/inicial', getInicial);

// Rotas da empresa
router.get('/dashboard', isAuthenticated, isEmpresa, dashboard);

router.get("/empresa/cadastrar", getCadastroEmpresa);
router.get("/empresa/:id", getEmpresa);
router.get("/empresas", getEmpresas);
router.post("/empresa/cadastrar", createEmpresa);
router.put("/empresa/editar/:id", updateEmpresa);
router.delete("/empresa/excluir/:id", deleteEmpresa);

/*/ Rotas do candidato
router.get('/dashboard', isAuthenticated, isCandidato, candidatoController.dashboard);

router.get("/candidato/perfil/:id", checarToken, getPerfilCandidato);
router.get("/candidato/cadastrar", getCadastroCandidato);
router.post("/candidato/cadastrar", cadastroCandidato);
router.post("/candidato/login", realizarLogin);
router.get("/candidato/inicial", getInicial);
//router.post("/candidato/redefinirSenha", setSenha); // muda todas as senhas de todos os candidatos de uma vez?*/

module.exports = router;