const express = require('express')
const router = express.Router()

const models = require('../models/model')
const modelJob = models.empresa

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar vagas", error });
      }
  })