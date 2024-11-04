const mongoose = require('mongoose')

module.exports = mongoose.model('Empresa', {
    name: String,
    cnpj: String,
    email: String,
    fone: String,
    bio: String,
    site: String
})