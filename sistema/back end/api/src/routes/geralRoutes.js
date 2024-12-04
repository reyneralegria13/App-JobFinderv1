const express = require("express");
const router = express.Router();

const {realizarLogin, recuperarSenha, redefinirSenha} =require('../controller/loginController');
const { getCargo, getHome, getLogin, getRecuperarSenha, getRedefinirSenha } = require('../controller/telasController')

// Rotas das telas
router.get("/home", getHome);
router.get("/cargo", getCargo);
router.get("/login", getLogin);
router.post("/login", realizarLogin);
router.get("/recuperar_senha", getRecuperarSenha);
router.post("/recuperar_senha", recuperarSenha);
router.get('/redefinir_senha/:token', getRedefinirSenha);
router.post('/redefinir_senha/:token', redefinirSenha);

module.exports = router;