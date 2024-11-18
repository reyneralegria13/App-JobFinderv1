const mongoose =require('mongoose')

//para testes
const dbUri = 'mongodb://localhost:27017/jobFinder'
//"mongodb+srv://JobFinderDB:WiMuOlRTRqOZUQ5o@jobfinder-server.pgslx.mongodb.net/JobFinder-Server?retryWrites=true&w=majority&appName=JobFinder-Server"

module.exports = () => mongoose.connect(dbUri)