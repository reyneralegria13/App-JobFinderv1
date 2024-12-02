const Candidato = require('../models/candidatoModel.js');
/*const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')*/

exports.dashboard = (req, res) => {
  // Exemplo: Recuperar informações do candidato e passar para o Handlebars
  const candidatoId = req.session.user.id;

  // Aqui você buscaria dados do banco, mas para simplificar:
  res.render('fun/candidatoDashboard', {
      user: req.session.user, // Dados da sessão
      message: 'Bem-vindo ao seu painel, Candidato!'
  });
};



//rota para a página de cadastro de candidato
const getCadastroCandidato = async (req, res) => {
    res.render('fun/reg_candidato', {
      title: 'Registro de Candidato',
      style: 'reg_candidato.css'
    });
};

//Rota privada do perfil do usuário para testes de autenticação
const getPerfilCandidato = async (req, res) => {
    const id = req.params.id
  
    //checar se o usuário existe
    const user = await Candidato.findById(id, '-senha')
  
    if(!user){
      return res.status(404).send("Usuário não encontrado")
    }
  
    res.status(200).json({user})
}

//validação de cadastro de candidato
const cadastroCandidato = async (req, res) => {
    const { nome, cpf, email, senha, telefone, educacao, qualificacao, cursos, descricao, habilidadesTecnicas, idiomas } = req.body;
  
    if(!nome){
      return res.status(422).json({mgs:"O nome é obrigatório!"})
    }
    if(!cpf){
      return res.status(422).json({mgs:"O cpf é obrigatório!"})
    }
    if(!telefone){
      return res.status(422).json({mgs:"O telefone é obrigatório!"})
    }
    if(!email){
      return res.status(422).json({mgs:"O email é obrigatório!"})
    }
    if(!senha){
      return res.status(422).json({mgs:"A senha é obrigatório!"})
    }
  
    //Caso seja usado o "confirmar senha"
    /*if(senha != confirmarSenha){
        return res.status(422).json({mgs:"As senhas não confere!"})
    }*/
  
    //Ver se o usuário existe
    const userExiste = await Candidato.findOne({email: email})
  
    if(userExiste){
      return res.status(422).json({mgs:"Email já utilizado no sistema. Por favor, escolher outro."})
    }
  
    //proteção de senha 
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)
  
    try {
      const novoCandidato = new Candidato({
        nome,
        cpf,
        email,
        senha: senhaHash,
        telefone,
        educacao,
        qualificacao,
        cursos,
        descricao,
        habilidadesTecnicas,
        idiomas
      });
      //leva para o banco de dados
      await novoCandidato.save();
  
      // ao terminar, volta pra a home
      res.redirect('/home');
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao cadastrar o candidato.");
    }
};

// Rota para a página inicial (protegida)
const getInicial = async (req, res) => {
  try {
      // Busca o usuário no banco de dados usando o ID do token
      const user = await Candidato.findById(req.user.id, '-senha'); // Exclui a senha do retorno
      if (!user) {
          return res.status(404).json({ msg: 'Usuário não encontrado!' });
      }

      // Renderiza uma página ou retorna dados JSON
      res.render('fun/inicial', {
          title: 'Página Inicial',
          style: 'inicial.css',
          user: user.nome, // Passa o nome do usuário para a página inicial
      });
  } catch (err) {
      console.error("Erro ao carregar a página inicial:", err);
      res.status(500).send("Erro ao carregar a página inicial.");
  }
};

module.exports = {
    getCadastroCandidato,
    getPerfilCandidato,
    cadastroCandidato,
    getInicial
};