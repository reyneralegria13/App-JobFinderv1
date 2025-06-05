const mongoose = require('mongoose');

const relacaoSchema = new mongoose.Schema({
    candidato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato',
        required: true
    },
    vaga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vagas',
        required: true
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
    status: {
        type: String,
        enum: ['Pendente', 'Aceito', 'Rejeitado'],
        default: 'Pendente'
    }
});

module.exports = mongoose.model('Candidatura', relacaoSchema);