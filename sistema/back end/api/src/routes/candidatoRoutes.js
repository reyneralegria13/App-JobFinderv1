const express = require('express');
const router = express.Router();
const { isAuthenticated, isCandidato } = require('../middleware/auth');
const { dashboard, getPerfilCandidato, getCadastroCandidato, cadastroCandidato } = require('../controller/candidatoController');
//const {dashboard} = require("../controller/candidatoController");


// Rotas do candidato
router.get('/dashboard', isAuthenticated, isCandidato, dashboard);

router.get("/perfil/:id", getPerfilCandidato);
router.get("/cadastrar", getCadastroCandidato);
router.post("/cadastrar", cadastroCandidato);



module.exports = router;