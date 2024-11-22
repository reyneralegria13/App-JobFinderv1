const mongoose =require('mongoose')

//para testes
const dbUri = "mongodb+srv://JobFinderDB:WiMuOlRTRqOZUQ5o@jobfinder-server.pgslx.mongodb.net/JobFinder-Server?retryWrites=true&w=majority&appName=JobFinder-Server"
//'mongodb://localhost:27017/jobFinder'

module.exports = () => mongoose.connect(dbUri)