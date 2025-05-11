const express = require("express");
const router = express.Router();
const multer = require('multer'); // Para upload de arquivos
const upload = multer();
const { getVagas, getCriarVagas, getCandidaturas, Vercandidatos, visualizarTelaEdicaoEmpre} = require('../controller/telasController')
const { getCadastroEmpresa, getEmpresa, createEmpresa, updateEmpresa, deleteEmpresa, dashboardEmpresa, criarVagaParaEmpresa, updateStatus, buscacandidatos } = require("../controller/empresaController");
const { isAuthenticated, isEmpresa } = require('../middleware/auth');

// Rotas da empresa
router.get('/dashboard', isAuthenticated, isEmpresa, dashboardEmpresa);
router.get("/cadastrar", getCadastroEmpresa);
router.get("/:empresaId/perfil", getEmpresa);
router.post("/cadastrar", createEmpresa);
router.get("/:empresaId/editar", visualizarTelaEdicaoEmpre);
router.post("/:empresaId/editar", updateEmpresa);
router.delete("/excluir/:id", deleteEmpresa);
router.get('/candidatos/buscar', buscacandidatos);
router.get('/:empresaId/vagas', getVagas);
router.get("/:empresaId/vagas/criar", getCriarVagas);
router.post('/:empresaId/vagas/criar', upload.single('imagem'), criarVagaParaEmpresa);
router.get('/:empresaId/candidaturas', getCandidaturas)
router.get('/:empresaId/can/:id', Vercandidatos)
router.post('/candidaturas/:id/status', updateStatus)

module.exports = router;