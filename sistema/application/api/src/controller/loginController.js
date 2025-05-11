const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

exports.recuperarSenha = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASS
        }
    })

    try {
        const user = await Candidato.findOne({ email: req.body.email }) || await Empresa.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ error: 'E-mail não encontrado.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 15 * 60 * 1000; // 15 minutos em milissegundos

        // salva as informações
        user.resetToken = token;
        user.resetTokenExpiration = tokenExpiration;
        await user.save();

        const linkReset = `http://${req.headers.host}/redefinir_senha/${token}`;

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: req.body.email,
            subject: 'Recuperar senha - App JobFinder',
            html: `
            <h1>Recuperar Senha</h1>
            <p>Para recuperar sua senha, acesse o link abaixo:</p>
            <a href="${linkReset}">${linkReset}</a>
            <p>Este link expira em 1 hora.</p>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao recuperar a senha. Tente novamente.' });
    }
}

exports.redefinirSenha = async (req, res) => {
    try {
        const token = req.params.token;

        const user =
            (await Candidato.findOne({
                resetToken: token,
                resetTokenExpiration: { $gt: Date.now() },
            })) ||
            (await Empresa.findOne({
                resetToken: token,
                resetTokenExpiration: { $gt: Date.now() },
            }));

        if(!user){
            return res.status(404).json({ error: 'Token inválido ou expirado.' });
        }

        // Atualizar senha
        const salt = await bcrypt.genSalt(12)
        user.senha = await bcrypt.hash(req.body.senha, salt);
        user.resetToken = undefined; // Invalida o token
        user.resetTokenExpiration = undefined;
        await user.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).send(error.message);
    }
}


/*
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
