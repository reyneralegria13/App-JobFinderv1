const express = require("express");
const router = express.Router();
const multer = require('multer'); // Para upload de arquivos
const upload = multer();
const { isAuthenticated, isEmpresa } = require('../middleware/auth');

const {realizarLogin, recuperarSenha, redefinirSenha} =require('../controller/loginController');
const { getCargo, getHome, getLogin, getRecuperarSenha, getRedefinirSenha, criarVagas } = require('../controller/telasController')
const {  criarVagaParaEmpresa, dashboardEmpresa, buscacandidatos } = require("../controller/empresaController");

const { verVaga, candidatarse, buscarvagas } = require('../controller/candidatoController');

const {
    applyToJob,
    updateApplicationStatus,
    sendMessage,
    getApplicationDetails,
  } = require('../controller/statusController');
  
  // Inscrever-se em uma vaga
  router.post('/vagas/:vagaId/apply', isAuthenticated, applyToJob);
  
  // Atualizar status da inscrição
  router.put('/applications/:applicationId/status', isAuthenticated, updateApplicationStatus);
  
  // Enviar mensagem no chat
  router.post('/applications/:applicationId/chat', isAuthenticated, sendMessage);
  
  // Obter detalhes da inscrição
  router.get('/applications/:applicationId', isAuthenticated, getApplicationDetails);


// Rotas das telas
router.get("/home", getHome);
router.get("/cargo", getCargo);
router.get("/login", getLogin);
router.post("/login", realizarLogin);
router.get("/recuperar_senha", getRecuperarSenha);
router.post("/recuperar_senha", recuperarSenha);
router.get('/redefinir_senha/:token', getRedefinirSenha);
router.post('/redefinir_senha/:token', redefinirSenha);



//EMPRESA
router.get('/dashboard', isAuthenticated, isEmpresa, dashboardEmpresa);
router.get("/:empresaId/vagas/criar", criarVagas);
router.get('/candidatos/buscar', buscacandidatos);
router.post('/:empresaId/vagas', upload.single('imagem'), criarVagaParaEmpresa);
router.get('/vagas/buscar', buscarvagas);
router.get("/vagas/:id", verVaga);


module.exports = router;