exports.isAuthenticated = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
  } catch (erro) {
      console.error(erro);
      res.status(500).send({message: "Erro ao verificar a autenticação!", error: erro.message});
  }
};

exports.isCandidato = (req, res, next) => {
  try {
    if (req.session.user && req.session.user.role === 'candidato') {
      return next();
    }
    res.status(403).send('Acesso negado');
  } catch (erro) {
    console.error(erro);
    res.status(500).send({message: "Erro ao verificar a autentificação do candidato!", error: erro.message});
  }
};

exports.isEmpresa = (req, res, next) => {
  try {
    if (req.session.user && req.session.user.role === 'empresa') {
      return next();
    }
    res.status(403).send('Acesso negado');
  } catch (erro) {
    console.error(erro);
    res.status(500).send({message: "Erro ao verificar a autenticação do empregador!", error: erro.message});
  }
};
