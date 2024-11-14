const mongoose = require('mongoose')

const EmpresaSchema = mongoose.Schema(
    {
      nome: {
        type: String,
        require: [true, "Por favor, insira o nome da empresa"],
      },
  
      email: {
        type: String,
        require: true,
      },
      cnpj: {
        type: String,
        require: true,
        match: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
        message: 'O CNPJ deve seguir o formato XX.XXX.XXX/XXXX-XX'
      },
      fone: {
        type: String,
        require: true,
        match: /^\(\d{2}\) \d{5}-\d{4}$/,
        message: 'O número de telefone deve seguir o formato (XX) XXXXX-XXXX'
      },
      bio: {
        type: String,
        require: false,
      },
      site: {
        type: String,
        require: true,
      }
    },
    {
      timestamps: true,
    }
  );

  const Empresa = mongoose.model("Empresa", EmpresaSchema);

  module.exports = Empresa;
