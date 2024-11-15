const express = require("express");
const router = express.Router();
const { getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } = require("../contrroller/empresaController");

// rota para a página home
router.get('/home', (req, res) => {
    res.render('fun/home', {
        title: 'home',
        style: 'home.css' 
    });
});

router.get('/cargo', (req, res) => {
  res.render('fun/escolherCargo', {
    title: 'Escolher Cargo',
    style: 'escolherCargo.css'
  });
});

router.get('/cadCandidato', (req, res) => {
  res.render('fun/reg_candidato', {
    title: 'Registro de Candidato',
    style: 'reg_candidato.css'
  });
});


// outras rotas
router.get('/empresas', getEmpresas);
router.get("/empresa/:id", getEmpresa);
router.post("/regEmpresa", createEmpresa);
router.put("/upEmpresa/:id", updateEmpresa);
router.delete("/delEmpresa/:id", deleteEmpresa);

module.exports = router;
