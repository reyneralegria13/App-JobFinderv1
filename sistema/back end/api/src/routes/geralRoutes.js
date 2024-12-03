const express = require("express");
const router = express.Router();

const {realizarLogin} =require('../controller/loginController');
const { getCargo, getHome, getLogin, getRecuperarSenha } = require('../controller/telasController')


// Rotas das telas
router.get("/home", getHome);
router.get("/cargo", getCargo);
//router.get("/login", login)
router.get("/login", getLogin);
//router.post("/login", login)
router.post("/login", realizarLogin);
router.get("/recuperar_senha", getRecuperarSenha);

module.exports = router;