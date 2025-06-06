const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');
const Candidatura = require('../models/candidaturaModel');
const Vaga = require('../models/vagasModel');
//const Vaga = require('../models/vagasModel');

// rota para a página home
const getHome = async (req, res) => {
    try {
        res.render('fun/home', {
            title: 'Home',
            style: 'home.css'
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página incial!',
            error: erro.messgae
        });
    }
}

//rota para a página para escolher cargo
const getCargo = async (req, res) => {
    try {
        res.render('fun/escolherCargo', {
            title: 'Escolher Cargo',
            style: 'escolherCargo.css'
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página de cargos!',
            error: erro.messgae
        });
    }
};

//rota para a pagina de login
const getLogin = async (req, res) => {
    try {
        res.render('fun/login', {
            title: 'Login',
            style: 'login.css'
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página de login!',
            error: erro.messgae
        });
    }
};

const getRecuperarSenha = async (req, res) => {
    try {
        res.render('fun/esqueciSenha', {
            title: 'Recuperar Senha',
            style: 'esqueciSenha.css'
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Recuperar Senha!',
            error: erro.messgae
        });
    }
};

// GET: Exibir página de redefinição
const getRedefinirSenha = async (req, res) => {
    try {
        const token = req.params.token;

        // Verificar se o token é válido
        const user =
            await Candidato.findOne({
                resetToken: token,
                resetTokenExpiration: {
                    $gt: Date.now()
                },
            }) ||
            await Empresa.findOne({
                resetToken: token,
                resetTokenExpiration: {
                    $gt: Date.now()
                },
            });

        if (!user) {
            return res.status(400).json({
                error: 'Token inválido ou expirado.'
            });
        }

        res.render("fun/redefinirSenha", {
            title: "Redefinir Senha",
            style: "redefinirSenha.css",
            token
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Redefenir Senha!',
            error: erro.messgae
        });
    }
};

const getCriarVagas = (req, res) => {
    try {
        const {
            empresaId
        } = req.params;
        res.render('fun/criarVagas', {
            title: 'Criar Vagas',
            style: 'criarVagas.css',
            empresaId,
        })
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Criar Vagas!',
            error: erro.messgae
        });
    }
};

const getVagas = async (req, res) => {
    try {
        const empresaId = req.params.empresaId;
        const empresa = await Empresa.findById(empresaId).populate('vagas');

        if (!empresa) {
            return res.status(404).json({
                message: 'Empresa não encontrada!'
            });
        }

        // Converte as imagens para Base64
        const vagasComImagens = empresa.vagas.map(vaga => {
            let imagemBase64 = null;
            if (vaga.imagem && vaga.imagem.data) {
                imagemBase64 = `data:${vaga.imagem.contentType};base64,${vaga.imagem.data.toString('base64')}`;
            }

            return {
                ...vaga._doc,
                imagem: imagemBase64,
            };
        });

        res.render('fun/vagas', {
            title: "Vagas",
            style: "vagas.css",
            vagas: vagasComImagens,
            empresaId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Vagas!',
            error: erro.messgae
        });
    }
};

const getCandidaturas = async (req, res) => {
    try {
        const candidatoId = req.user._id; // Obtém o ID do candidato autenticado
        const candidaturas = await Candidatura.find({
                candidato: candidatoId
            })
            .populate('vaga')
            .populate('empresa');

        res.render('fun/candidaturas', {
            title: 'Lista de Candidaturas',
            style: 'candidaturas.css',
            candidaturas,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Candidaturas!',
            error: erro.messgae
        });
    }
};

// renderiza a página das candidaturas de uma vaga
const visualizarCandidaturas = async (req, res) => {
    try {
        const candidatoId = req.params.candidatoId;

        const candidaturas = await Candidatura.find({
                candidato: candidatoId
            })
            .populate('candidato')
            .populate('vaga')
            .populate('empresa');

        if (!candidaturas || candidaturas.length === 0) {
            return res.status(404).send({
                message: 'Candidaturas não encontradas!'
            });
        }

        // Converte as imagens para Base64
        const candidaturasComImagens = candidaturas.map(candidatura => {
            let imagemBase64 = null;
            if (candidatura.vaga.imagem && candidatura.vaga.imagem.data) {
                imagemBase64 = `data:${candidatura.vaga.imagem.contentType};base64,${candidatura.vaga.imagem.data.toString('base64')}`;
            }

            return {
                ...candidatura._doc,
                vaga: {
                    ...candidatura.vaga._doc,
                    imagem: imagemBase64
                }
            };
        });

        res.render('can/ver_candidaturas', {
            title: 'Lista de Candidaturas',
            style: 'verCandidatura.css',
            candidaturas: candidaturasComImagens,
            candidatoId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Lista de Candidaturas!',
            error: erro.messgae
        });
    }
};

const visualizarCandidatos = async (req, res) => {
    try {
        const empresaId = req.params.empresaId;
        const {
            id
        } = req.params;

        const candidaturas = await Candidatura.find({
            vaga: id
        }).populate('candidato').populate('vaga').populate('empresa');

        if (!candidaturas) {
            return res.status(404).send({
                message: 'Candidaturas nao encontradas!'
            });
        }

        res.render('fun/candidatos_vagas', {
            title: 'Lista de Candidatos',
            style: 'repostacandidato.css',
            candidaturas,
            empresaId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página Lista de Candidatos!',
            error: erro.messgae
        });
    }

}

const getVagaDetalhes = async (req, res) => {
    try {
        const candidatoId = req.user._id; // Obtém o ID do candidato autenticado
        const vagaId = req.params.vagaId; // Obtém o ID da vaga da URL

        // Buscar a vaga específica pelo ID
        const vaga = await Vaga.findById(vagaId).populate('empresa'); // Assumindo que a vaga tem referência à empresa

        if (!vaga) {
            return res.status(404).json({
                message: 'Vaga não encontrada!'
            });
        }

        // Renderizar a página com os detalhes da vaga
        res.render('fun/vagaDetalhes', {
            title: vaga.nome,
            style: 'vagaDetalhes.css', // Adapte conforme o seu arquivo de estilo
            vaga, // Passa os detalhes da vaga para a view
            candidatoId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página da vaga!',
            error: erro.messgae
        });
    }
};

const visualizarTelaEdicaoCand = async (req, res) => {
    try {
        // Obtém o ID do candidato a partir dos parâmetros da rota
        const candidatoId = req.params.candidatoId;

        // Busca o candidato no banco de dados pelo ID
        const candidato = await Candidato.findById(candidatoId);

        // Verifica se o candidato foi encontrado
        if (!candidato) {
            return res.status(404).send('Candidato não encontrado');
        }

        // Renderiza a view de edição, passando os dados do candidato
        res.render('can/perfilEditar', {
            title: 'Edição de Perfil', // Título da página
            style: 'perfilEditar.css',
            user: candidato,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página de edição do perfil do candidato!',
            error: erro.messgae
        });
    }
};

const visualizarTelaEdicaoEmpre = async (req, res) => {
    try {
        // Obtém o ID do candidato a partir dos parâmetros da rota
        const empresaId = req.params.empresaId;

        // Busca o candidato no banco de dados pelo ID
        const empresa = await Empresa.findById(empresaId);

        // Verifica se o candidato foi encontrado
        if (!empresa) {
            return res.status(404).send('Empresa não encontrada');
        }

        // Renderiza a view de edição, passando os dados do candidato
        res.render('fun/perfilEditar', {
            title: 'Edição de Perfil', // Título da página
            style: 'editarPerfilEmpresa.css',
            user: empresa,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            message: 'Erro ao renderizar a página de edição do perfil da empresa!',
            error: erro.messgae
        });
    }
};

module.exports = {
    getHome,
    getCargo,
    getLogin,
    getRecuperarSenha,
    getRedefinirSenha,
    getCriarVagas,
    getVagaDetalhes,
    getVagas,
    getCandidaturas,
    visualizarCandidaturas,
    visualizarCandidatos,
    visualizarTelaEdicaoCand,
    visualizarTelaEdicaoEmpre
}