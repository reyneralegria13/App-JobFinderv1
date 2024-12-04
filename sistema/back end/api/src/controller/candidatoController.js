const Candidato = require('../models/candidatoModel.js');
const bcrypt = require('bcrypt')


const dashboardCandidato = (req, res) => {
    const candidatoId = req.session.user.id;

    res.render('fun/candidatoDashboard', {
        user: req.session.user,
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
      
      await novoCandidato.save();
      res.redirect('/home');
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao cadastrar o candidato.");
    }
};

module.exports = {
    dashboardCandidato,
    getCadastroCandidato,
    getPerfilCandidato,
    cadastroCandidato,
};