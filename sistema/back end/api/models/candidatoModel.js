const mongoose = require('mongoose');

const candidatoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    cpf:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v);
            },
            message: 'CPF inválido'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: 'Email inválido'
        }
    },
    senha: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16
    },
    telefone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\(\d{2}\) \d{5}-\d{4}$/.test(v);
            },
            message: 'O número de telefone deve seguir o formato (XX) XXXXX-XXXX'
        }
    },
    educacao: {
        type: String,
        required: true,
    },
    qualificacao: {
        type: String,
        required: false,
    },
    cursos: {
        type: [String],
        required: false,
        default: []
    },
    descricao: {
        type: [String],
        required: false,
    },
    habilidadesTecnicas:{
        type: [String],
        required: false,
        default: []
    },
    idiomas: {
        type: [String],
        required: false,
        default: []
    }
})

module.exports = mongoose.model('Candidato', candidatoSchema);