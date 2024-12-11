const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');
const Candidatura = require('../models/candidaturaModel');
const Vaga = require('../models/vagasModel');
//const Vaga = require('../models/vagasModel');

// rota para a página home
const getHome = async (req, res) => {
    res.render('fun/home', {
        title: 'home',
        style: 'home.css' 
    });
};

//rota para a página para escolher cargo
const getCargo = async (req, res) => {
    res.render('fun/escolherCargo', {
      title: 'Escolher Cargo',
      style: 'escolherCargo.css'
    });
};

//rota para a pagina de login
const getLogin = async (req, res) => {
    res.render('fun/login', {
      title: 'Login',
      style: 'login.css'
    });
};

const getRecuperarSenha = async (req, res) => {
    res.render('fun/esqueciSenha', {
      title: 'Recuperar Senha',
      style: 'esqueciSenha.css'
    });
};

// GET: Exibir página de redefinição
const getRedefinirSenha = async (req, res) => {
  try {
    const token = req.params.token;

    // Verificar se o token é válido
    const user = 
    await Candidato.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    }) || 
    await Empresa.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido ou expirado.' });
    }

    res.render("fun/redefinirSenha", {
      title: "Redefinir Senha",
      style: "redefinirSenha.css",
      token });
  } catch (err) {
    console.error('Erro ao renderizar a página:', err);
    res.status(500).send(err.message);
  }
};
const getCriarVagas = (req, res) => {
  const { empresaId } = req.params;
  res.render('fun/criarVagas', {
    title: 'Criar Vagas', 
    style: 'criarVagas.css',
    empresaId,
})};

const getVagas = async (req, res) => {
  try {
    const empresaId = req.params.empresaId;
    const empresa = await Empresa.findById(empresaId).populate('vagas');

    if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada!' });
    }

    res.render('fun/vagas', {
        title: "Vagas",
        style: "vagas.css",
        vagas: empresa.vagas,
        empresaId
    })


} catch (error) {
    console.error('Erro ao buscar vagas:', error);
    res.status(500).send(error.message);
}
}

const getCandidaturas = async (req, res) => {

  const empresaId = req.params.empresaId

  const candidaturas = await Candidatura.find({ empresa: empresaId }).populate('candidato');

  if(!candidaturas){
      return res.status(404).send({ message: 'Candidaturas nao encontradas!' });
  }

  res.render('fun/candidaturas', {
    title: 'Lista de Candidatos',
    style: 'candidaturas.css',
    candidaturas
  });
 
};

const getCandidaturasc = async (req, res) => {

  const candidatoId = req.params.candidatoId

  const candidaturas = await Candidatura.find({ candidato: candidatoId }).populate('candidato').populate('vaga').populate('empresa');
 

  if(!candidaturas){
      return res.status(404).send({ message: 'Candidaturas nao encontradas!' });
  }

  res.render('can/ver_candidaturas', {
    title: 'Lista de Candidatos',
    style: 'candidaturas.css',
    candidaturas,
    candidatoId
    
  });
 
};
module.exports = {
    getHome,
    getCargo,
    getLogin,
    getRecuperarSenha,
    getRedefinirSenha,
    getCriarVagas,
    getVagas,
    getCandidaturas,
    getCandidaturasc,
}
