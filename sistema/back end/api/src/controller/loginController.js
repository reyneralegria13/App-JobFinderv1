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

    const { email } = req.body;
    try {
        const user = await Candidato.findOne({ email }) || await Empresa.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'E-mail não encontrado.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 3600000

        user.resetToken = token;
        user.resetTokenExpiration = tokenExpiration;
        await user.save();

        const linkReset = `http://${req.headers.host}/resetar-senha/${token}`;

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: 'Recuperar senha - App JobFinder',
            html: `
            <h1>Recuperar Senha</h1>
            <p>Para recuperar sua senha, acesse o link abaixo:</p>
            <a href="${linkReset}">${linkReset}</a>
            <p>Este link expira em 1 hora.</p>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Falha ao enviar o e-mail de recuperação.' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email de recuperação de senha enviado com sucesso.' });
        });

        res.redirect('/login');
    } catch (error) {
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
