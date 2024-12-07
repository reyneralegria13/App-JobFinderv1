const mongoose =require('mongoose')

//Oficial
//const dbUri = "mongodb+srv://JobFinderDB:WiMuOlRTRqOZUQ5o@jobfinder-server.pgslx.mongodb.net/JobFinder-Server?retryWrites=true&w=majority&appName=JobFinder-Server"
//para testes
const dbUri = 'mongodb://localhost:27017/jobFinder'

module.exports = () => mongoose.connect(dbUri)