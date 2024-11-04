const express = require('express')
const router = express.Router()

const {Empresa } = require('../models/model');

// listar empresas (get)
router.get('/', async (req, res) => {
  try {
      const empresas = await Empresa.find();
      res.status(200).json(empresas);
  } catch (error) {
      res.status(500).json({ message: "Erro ao buscar empresas", error });
  }
});

// criar empresa (post)
router.post('/registro', async (req, res) => {
  const empresaData = req.body;

  try {
      const newEmpresa = new Empresa(empresaData);
      await newEmpresa.save();
      res.status(201).json(newEmpresa);
  } catch (error) {
      res.status(500).json({ message: "Erro ao criar a empresa", error });
  }
});

// atualizar empresa (update)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
      const updatedEmpresa = await Empresa.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedEmpresa) {
          return res.status(404).json({ message: "Empresa não encontrada" });
      }
      res.status(200).json(updatedEmpresa);
  } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar a empresa", error });
  }
});

// deletar empresa (delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedEmpresa = await Empresa.findByIdAndDelete(id);
      if (!deletedEmpresa) {
          return res.status(404).json({ message: "Empresa não encontrada" });
      }
      res.status(200).json({ message: "Empresa excluída com sucesso" });
  } catch (error) {
      res.status(500).json({ message: "Erro ao excluir empresa", error });
  }
});

module.exports = router