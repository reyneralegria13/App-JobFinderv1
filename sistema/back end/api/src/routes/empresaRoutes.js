const express = require("express");
const router = express.Router();
const multer = require('multer'); // Para upload de arquivos
const upload = multer();
const { getVagas, getCriarVagas, getCandidaturas } = require('../controller/telasController')
const { getCadastroEmpresa, getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa, dashboardEmpresa, criarVagaParaEmpresa } = require("../controller/empresaController");
const { isAuthenticated, isEmpresa } = require('../middleware/auth');

// Rotas da empresa
router.get('/dashboard', isAuthenticated, isEmpresa, dashboardEmpresa);
router.get("/cadastrar", getCadastroEmpresa);
router.get("/:id", getEmpresa);
router.get("/empresas", getEmpresas);
router.post("/cadastrar", createEmpresa);
router.post("/editar/:id", updateEmpresa);
router.delete("/excluir/:id", deleteEmpresa);
router.get('/:empresaId/vagas', getVagas);
router.get("/:empresaId/vagas/criar", getCriarVagas);
router.post('/:empresaId/vagas/criar', upload.single('imagem'), criarVagaParaEmpresa);
router.get('/:empresaId/candidaturas', getCandidaturas)

module.exports = router;