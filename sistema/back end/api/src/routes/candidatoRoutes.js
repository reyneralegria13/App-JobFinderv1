const express = require('express');
const router = express.Router();
const { isAuthenticated, isCandidato } = require('../middleware/auth');
const {candidatoController, getPerfilCandidato, getCadastroCandidato, cadastroCandidato, getInicial} = require('../controller/candidatoController');
const {dashboard} = require("../controller/candidatoController");
const {realizarLogin, setSenha} =require('../controller/loginController');


// Rotas do candidato
router.get('/dashboard', isAuthenticated, isCandidato, dashboard);

router.get("/candidato/perfil/:id", getPerfilCandidato);
router.get("/candidato/cadastrar", getCadastroCandidato);
router.post("/candidato/cadastrar", cadastroCandidato);
router.post("/candidato/login", realizarLogin);
router.get("/candidato/inicial", getInicial);
//router.post("/candidato/redefinirSenha", setSenha); // muda todas as senhas de todos os candidatos de uma vez?

module.exports = router;