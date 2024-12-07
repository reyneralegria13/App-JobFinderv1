const mongoose = require('mongoose')
const Empresa = require('./empresaModel')

const VagasSchema = new mongoose.Schema({
    nome: String,
    descrisao: String,
    imagem: { data: Buffer, contentType: String }
  });
  
  module.exports = mongoose.model('Vagas', VagasSchema);