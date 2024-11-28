require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//função para validar o token
const checarToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header Recebido:", authHeader); // Log do cabeçalho recebido

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token Extraído:", token); // Log do token extraído

  if (!token) {
      console.error("Token ausente!");
      return res.status(401).json({ msg: 'Acesso negado!' });
  }

  try {
      const secret = process.env.SECRET;
      const decoded = jwt.verify(token, secret);
      console.log("Token Decodificado com Sucesso:", decoded); // Log do conteúdo decodificado
      req.user = decoded; // Adiciona os dados do usuário à requisição
      next();
  } catch (error) {
      console.error("Erro ao validar o token:", error.message); // Log do erro
      return res.status(403).json({ msg: 'Token inválido!' });
  }
};






module.exports = checarToken