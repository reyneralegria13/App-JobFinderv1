const express = require("express");
const Empresa = require("../contrroller/empresaController");
const router = express.Router();
const {getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa} = require("../contrroller/empresaController");

// rotas para cada controle
router.get('/empresas', getProducts);
router.get("/empresa/:id", getProduct);
router.post("/regEmpresa", createProduct);
router.put("/upEmpresa/:id", updateProduct);
router.delete("/delEmpresa/:id", deleteProduct);

module.exports = router;