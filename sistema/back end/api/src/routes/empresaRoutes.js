const express = require("express");
const router = express.Router();
const { getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } = require("../contrroller/empresaController");


module.exports = router;
