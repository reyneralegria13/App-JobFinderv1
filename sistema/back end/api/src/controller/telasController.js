const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');

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
const criarVagas = (req, res) => {
        const { empresaId } = req.params;
       res.render('fun/criarVagas', {
          title: 'Criar Vagas', 
          style: 'criarVagas.css',
          empresaId,
      });
 
};


module.exports = {
    getHome,
    getCargo,
    getLogin,
    getRecuperarSenha,
    getRedefinirSenha,
    criarVagas
}
