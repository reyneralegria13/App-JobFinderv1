const mongoose =require('mongoose')

const dbUri = "mongodb+srv://JobFinderDB:WiMuOlRTRqOZUQ5o@jobfinder-server.pgslx.mongodb.net/JobFinder-Server?retryWrites=true&w=majority&appName=JobFinder-Server"

module.exports = () => mongoose.connect(dbUri)

//ok