const mongoose = require('mongoose')

const EmpresaSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    minlength: 8
  },
  fone: {
    type: String,
    required: true,
  },
  bio:{
    type: String,
    required: false,
  },
  site: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Empresa", EmpresaSchema);
