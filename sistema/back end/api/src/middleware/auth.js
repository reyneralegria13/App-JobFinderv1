exports.isAuthenticated = (req, res, next) => {
  console.log("req.session em isAuthenticated:" ,req.session)
  if (req.session && req.session.user) {
      return next();
  }
  res.redirect('/login');
};

exports.isCandidato = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'candidato') {
      return next();
  }
  res.status(403).send('Acesso negado');
};

exports.isEmpresa = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'empresa') {
      return next();
  }
  res.status(403).send('Acesso negado');
};
