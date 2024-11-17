require('dotenv').config()
const jwt = require('jsonwebtoken')

//função para validar o token
const checarToken = async (req, res, next) =>{ 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
      return res.status(401).json({ msg: 'Acesso negado!' })
    }
    try {
      const secret = process.env.SECRET
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ msg: "token inválido!" })
    }
}

module.exports = checarToken