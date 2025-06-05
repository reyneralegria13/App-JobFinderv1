const Empresa = require("../models/empresaModel");
const Vagas = require('../models/vagasModel');
const candidato = require("../models/candidatoModel");
const bcrypt = require("bcrypt");
const Candidatura = require("../models/candidaturaModel");
const Swal = require('sweetalert2');

const dashboardEmpresa = async (req, res) => {
    try {
        const empresaId = req.session.user.id;

        const candidatos = await candidato.find();
        console.log('Produtos encontrados:', candidatos);

        const candidatosComImagens = candidatos.map(candidato => {
            let imagemBase64 = null;
            if (candidato.imagem && candidato.imagem.data) {
                imagemBase64 = `data:${vaga.imagem.contentType};base64,${vaga.imagem.data.toString('base64')}`;
            }

            return {
                ...candidato._doc,
                imagem: imagemBase64
            };
        });


        res.render('fun/empresaDashboard', {
            title: 'Dashboard',
            user: req.session.user,
            message: 'Bem-vindo ao seu painel, Empresa!',
            style: 'empresaDashboar.css',
            empresaId,
            candidatos: candidatosComImagens
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: "Erro ao renderizar a página dashboard da empresa!",
            error: erro.message
        });
    }
};

//rota para a página de cadastro de empresa
const getCadastroEmpresa = async (req, res) => {
    try {
        res.render('fun/reg_empresa', {
            title: 'Registro de Empresa',
            style: 'reg_empresa.css'
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: "Erro ao renderizar a página de cadastro da empresa!",
            error: erro.message
        });
    }
};

//Função ler (busca apenas uma empresa)
const getEmpresa = async (req, res) => {
    try {
        const {
            empresaId
        } = req.params;
        const empresa = await Empresa.findById(empresaId);

        if (!empresa) {
            res.status(404).json({
                message: "Empresa não encontrada!"
            })
        }

        res.render('can/getPerfil', {
            title: empresa.nome,
            style: 'getPerfilCand.css',
            user: empresa,
            id: empresa._id
        })
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: 'Erro ao renderizar a página de perfil da empresa!',
            error: erro.message
        });
    }
}

const createEmpresa = async (req, res) => {
    try {

        // verifica se há alguma empresa existente
        const empresa = await Empresa.findOne({
            cnpj: req.body.cnpj
        });

        if (empresa) {
            return res.status(409).json({
                message: "Empresa já cadastrada!"
            })
        }

        //proteção de senha 
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(req.body.senha, salt)

        const newEmpresa = new Empresa({
            nome: req.body.nome,
            email: req.body.email,
            cnpj: req.body.cnpj,
            senha: senhaHash,
            fone: req.body.fone,
            bio: req.body.bio,
            site: req.body.site
        })

        await newEmpresa.save();
        res.redirect('/home');

    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: "Erro ao cadastrar a empresa!",
            error: erro.message
        });
    }
}

// Função Update (atualiza uma empresa)
const updateEmpresa = async (req, res) => {
    try {
        const {
            nome,
            cnpj,
            email,
            fone,
            bio,
            site
        } = req.body;
        const {
            empresaId
        } = req.params;
        const empresa = await Empresa.findByIdAndUpdate(empresaId);

        if (!empresa) {
            res.status(404).json({
                message: "Empresa não encontrada!"
            })
        }

        // Atualizar os dados da empresa
        empresa.nome = nome || empresa.nome;
        empresa.cnpj = cnpj || empresa.cnpj;
        empresa.email = email || empresa.email;
        empresa.fone = fone || empresa.fone;
        empresa.bio = bio || empresa.bio;
        empresa.site = site || empresa.site;

        // Salvar as alterações no banco de dados
        await empresa.save();

        res.redirect(`/empresa/${empresa._id}/perfil`)

    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: 'Erro ao editar o perfil da empresa!',
            error: erro.message
        });
    }
}

// Função deletar (apaga uma empresa)
const deleteEmpresa = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const delEmpresa = await Empresa.findByIdAndDelete(id);


        if (!delEmpresa) {
            return res.status(404).json({
                message: "Empresa não encontrada!"
            });
        }

        res.status(200).json({
            message: "Empresa deletada com sucesso"
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: 'Erro ao deletar a empresa!',
            error: erro.message
        });
    }
}

const criarVaga = async (req, res) => {
    try {
        const {
            empresaId
        } = req.params;
        const {
            nome,
            area,
            requisitos
        } = req.body;

        // Busca a empresa pelo ID
        const empresa = await Empresa.findById(empresaId);
        if (!empresa) {
            return res.status(404).send({
                message: 'Empresa não encontrada!'
            });
        }

        // Criação da vaga
        const novaVaga = new Vagas({
            nome,
            area,
            requisitos,
            imagem: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined,
            empresa: empresa._id
        });

        // Salva a vaga no banco de dados
        await novaVaga.save();

        // Adiciona o ID da vaga ao array de vagas da empresa
        empresa.vagas.push(novaVaga._id);
        await empresa.save();

        // Redireciona com uma mensagem de sucesso
        res.redirect(`/empresa/${empresaId}/vagas/criar?success=true`);
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: 'Erro ao criar vaga para a empresa!',
            error: erro.message
        });
    }
};

const buscarCandidatos = async (req, res) => {
    try {
        const {
            q
        } = req.query; // Obtém o termo de busca

        // Filtra os candidatos com base na qualificação ou educação
        const candidatos = await candidato.find({
            $or: [{
                    qualificacao: {
                        $regex: q,
                        $options: 'i'
                    }
                }, // Busca no campo "qualificacao"
                {
                    educacao: {
                        $regex: q,
                        $options: 'i'
                    }
                } // Busca no campo "educacao"
            ]
        });

        // Converte as imagens para Base64
        const candidatosComImagens = candidatos.map(candidato => {
            let imagemBase64 = null;
            if (candidato.imagem && candidato.imagem.data) {
                imagemBase64 = `data:${candidato.imagem.contentType};base64,${candidato.imagem.data.toString('base64')}`;
            }

            return {
                ...candidato._doc,
                imagem: imagemBase64,
            };
        });

        // Renderiza o template com os resultados
        res.render('fun/resultCanddidatos', {
            candidatos: candidatosComImagens,
            query: q,
            title: 'Lista de Candidatos',
            style: 'buscacandidato.css'
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: 'Erro ao buscar os candidatos da vaga!',
            error: erro.message
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const {
            id
        } = req.params; // ID da candidatura a ser atualizada
        const {
            status
        } = req.body; // Novo status enviado pelo formulário ou requisição

        // Verifica se o status é válido
        if (!['Pendente', 'Aceito', 'Rejeitado'].includes(status)) {
            return res.status(400).send({
                message: 'Status inválido!'
            });
        }

        // Atualiza o status da candidatura
        const candidaturaAtualizada = await Candidatura.findByIdAndUpdate(
            id, {
                status
            }, {
                new: true
            } // Retorna o documento atualizado
        );

        if (!candidaturaAtualizada) {
            return res.status(404).send({
                message: 'Candidatura não encontrada!'
            });
        }

        res.redirect('/empresa/dashboard');
    } catch (erro) {
        console.error(erro);
        res.status(500).send({
            message: 'Erro ao atualizar o status da candidatura da vaga!',
            error: erro.message
        });
    }
};

module.exports = {
    getCadastroEmpresa,
    getEmpresa,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    dashboardEmpresa,
    criarVaga,
    buscarCandidatos,
    updateStatus,
}