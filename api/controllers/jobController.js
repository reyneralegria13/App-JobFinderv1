const express = require('express')
const router = express.Router()

//const models = require('../models/model')
const {Empresa } = require('../models/model');

router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Empresa.find();
        res.status(200).json(jobs);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar vagas", error });
      }
  })