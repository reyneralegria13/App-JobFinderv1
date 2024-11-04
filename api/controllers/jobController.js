const express = require('express')
const router = express.Router()

const {Empresa } = require('../models/model');

// listar empresas (get)
const getJob = router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Empresa.find();
        res.status(200).json(jobs);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar empresas", error });
      }
})

// criar empresa (post)
const createJob = router.post('/jobs', async (req, res) => {
  const jobData = req.body;

  try {
    const newJob = new Job(jobData);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a empresa", error });
  }
})

// atualizar empresa (update)
const updateJob = router.post('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a empresa", error });
  }
})

// deletar empresa (delete)
const deleteJob = router.delete('/jobs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }
    res.status(200).json({ message: "Empresa excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir empresa", error });
  }
})