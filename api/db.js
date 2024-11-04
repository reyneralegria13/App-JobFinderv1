const mongoose =require('mongoose')

const dbUri = "mongodb://localhost:27017/JobFinder"

module.exports = () => mongoose.connect(dbUri)