const mongoose = require('mongoose');

const empregadoSchema = new mongoose.Schema({
    status: Boolean,
    candidoto: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidato' } // Referência ao modelo Empresa
});

module.exports = mongoose.model('Empregado', empregadoSchema);