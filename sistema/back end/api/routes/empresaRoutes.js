const express = require("express");
const Empresa = require("../contrroller/empresaController");
const router = express.Router();
const {getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa} = require("../contrroller/empresaController");

// rotas para cada controle
router.get('/', async (req, res) => {
    
    res.render('layouts/Home', {
      title: 'Fornecedores',
            
    });
  });
router.get('/empresas', getEmpresas);
router.get("/empresa/:id", getEmpresa);
router.post("/regEmpresa", createEmpresa);
router.put("/upEmpresa/:id", updateEmpresa);
router.delete("/delEmpresa/:id", deleteEmpresa);

module.exports = router;