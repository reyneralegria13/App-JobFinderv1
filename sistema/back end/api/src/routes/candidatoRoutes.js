const express = require('express');
const router = express.Router();
const multer = require('multer'); // Para upload de arquivos
const upload = multer();
const { isAuthenticated, isCandidato } = require('../middleware/auth');
const { dashboardCandidato, getPerfilCandidato, getCadastroCandidato, cadastroCandidato, verVaga,candidatarse, buscarvagas, verCandidatura, cancelarCandidatura, editarPerfilCandidato } = require('../controller/candidatoController');
const {getCandidaturasc} = require('../controller/telasController')



//const {dashboard} = require("../controller/candidatoController");


// Rotas do candidato
router.get('/dashboard', isAuthenticated, isCandidato, dashboardCandidato);
router.get("/perfil/:id", getPerfilCandidato);
router.get("/cadastrar", getCadastroCandidato);
router.post("/cadastrar", upload.single('imagem'), cadastroCandidato);
router.get("/vagas/:id", verVaga);
router.post("/:candidatoId/vagas/:id", candidatarse);
router.get("/candidaturas", isAuthenticated, isCandidato, verCandidatura);
router.get('/vagas/buscar', buscarvagas);
router.post('/:candidatoId/vagas/delete/:candidaturaId', cancelarCandidatura)
router.get('/:candidatoId/candidaturas', getCandidaturasc)

// Rota para editar perfil
router.post('/perfil/:id/editar', isAuthenticated, isCandidato, editarPerfilCandidato);



module.exports = router;