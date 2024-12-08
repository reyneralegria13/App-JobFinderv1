const mongoose = require('mongoose');

const relacaoSchema = new mongoose.Schema({
  candidato: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidato', required: true },
  vaga: { type: mongoose.Schema.Types.ObjectId, ref: 'Vagas', required: true },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  status: { type: String, enum: ['Pendente', 'Aceito', 'Rejeitado'], default: 'Pendente' },
  chat: [
    {
      sender: { type: String, enum: ['Empresa', 'Candidato'], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Application', relacaoSchema);