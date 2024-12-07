const express = require("express");
const router = express.Router();
const multer = require('multer'); // Para upload de arquivos
const upload = multer();

const {realizarLogin, recuperarSenha, redefinirSenha} =require('../controller/loginController');
const { getCargo, getHome, getLogin, getRecuperarSenha, getRedefinirSenha, criarVagas } = require('../controller/telasController')
const {  criarVagaParaEmpresa } = require("../controller/empresaController");


// Rotas das telas
router.get("/home", getHome);
router.get("/cargo", getCargo);
router.get("/login", getLogin);
router.post("/login", realizarLogin);
router.get("/:empresaId/vagas/criar", criarVagas);
router.get("/recuperar_senha", getRecuperarSenha);
router.post("/recuperar_senha", recuperarSenha);
router.get('/redefinir_senha/:token', getRedefinirSenha);
router.post('/redefinir_senha/:token', redefinirSenha);
router.post('/:empresaId/vagas', upload.single('imagem'), criarVagaParaEmpresa);

module.exports = router;