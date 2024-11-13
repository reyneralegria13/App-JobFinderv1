const mongoose = require('mongoose');

const candidatoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
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
        match: /^\(\d{2}\) \d{5}-\d{4}$/,
        message: 'O número de telefone deve seguir o formato (XX) XXXXX-XXXX'
    },
    qualificacao: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },


})