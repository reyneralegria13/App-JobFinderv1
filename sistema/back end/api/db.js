const mongoose =require('mongoose')

//para testes
const dbUri = "mongodb://localhost:27017/"

module.exports = () => mongoose.connect(dbUri)