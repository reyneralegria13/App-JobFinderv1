const express = require("express");
const router = express.Router();
const multer = require('multer'); // Para upload de arquivos
const upload = multer();
const { criarVagas } = require('../controller/telasController')
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
router.get("/:empresaId/vagas/criar", criarVagas);
router.post('/:empresaId/vagas/criar', upload.single('imagem'), criarVagaParaEmpresa);

/*/ Rotas do candidato
router.get('/dashboard', isAuthenticated, isCandidato, candidatoController.dashboard);

router.get("/candidato/perfil/:id", checarToken, getPerfilCandidato);
router.get("/candidato/cadastrar", getCadastroCandidato);
router.post("/candidato/cadastrar", cadastroCandidato);
router.post("/candidato/login", realizarLogin);
router.get("/candidato/inicial", getInicial);
//router.post("/candidato/redefinirSenha", setSenha); // muda todas as senhas de todos os candidatos de uma vez?*/

module.exports = router;