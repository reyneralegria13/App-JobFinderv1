/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/
const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');
const bcrypt = require('bcrypt');

exports.realizarLogin = async (req, res) => {
    const { email, senha } = req.body;
    try {
        let user = await Candidato.findOne({ email });

        if (!user) {
            user = await Empresa.findOne({ email });
        }
        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
        }

        const isValidPassword = await bcrypt.compare(senha, user.senha);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
        }

        const userType = user.constructor.modelName.toLowerCase();
        
        req.session.user = { id: user._id, role: userType };

        return res.json({
            message: 'Login bem-sucedido',
            redirectUrl: userType === 'candidato' ? '/candidato/dashboard' : '/empresa/dashboard',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocorreu um erro no login. Tente novamente.' });
    }
};






// Função de login
/*const realizarLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(422).json({ msg: "Email e senha são obrigatórios!" });
    }

    const user = await Candidato.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
        return res.status(422).json({ msg: "Senha inválida!" });
    }

    const token = jwt.sign(
      { id: user._id, nome: user.nome },
      process.env.SECRET,
      { expiresIn: "10m" }
  );
  
    return res.status(200).json({ msg: "Login realizado com sucesso", token });
};

// Atualizar senhas (se necessário)
const setSenha = async (req, res) => {
    try {
        const candidatos = await Candidato.find({});
        for (const candidato of candidatos) {
            if (!candidato.senha.startsWith('$2b$')) {
                const salt = await bcrypt.genSalt(12);
                candidato.senha = await bcrypt.hash(candidato.senha, salt);
                await candidato.save();
            }
        }
        res.status(200).send("Todas as senhas foram atualizadas.");
    } catch (error) {
        res.status(500).send("Erro ao atualizar as senhas.");
    }
};

module.exports = {
    realizarLogin,
    setSenha,
};*/
