const mongoose = require('mongoose');

const VagasSchema = new mongoose.Schema({
    nome: String,
    area: String,
    requisitos: String,
    imagem: { data: Buffer, contentType: String },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' } // Referência ao modelo Empresa
});

module.exports = mongoose.model('Vagas', VagasSchema);