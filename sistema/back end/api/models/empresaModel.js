const mongoose = require('mongoose')

const EmpresaSchema = mongoose.Schema(
    {
      nome: {
        type: String,
        require: [true, "Por favor, insira o nome do produto"],
      },
  
      email: {
        type: String,
        require: true,
        default: 0,
      },
      cnpj: {
        type: String,
        require: true,
        default: 0,
      },
      fone: {
        type: String,
        require: true,
      },
      bio: {
        type: String,
        require: true,
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
