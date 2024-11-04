const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    name: String,
    email: String,
    empregado: Boolean
})

const EmpresaModel = mongoose.Schema({
    name: String,
    cnpj: String,
    email: String,
    fone: String,
    bio: String,
    site: String
})

module.exports = {
    User: mongoose.model('User ', UserModel),
    Empresa: mongoose.model('Empresa', EmpresaModel)
}