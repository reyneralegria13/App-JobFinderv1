const Empresa = require("../models/empresaModel");
const Vagas = require('../models/vagasModel');
const candidato = require("../models/candidatoModel");
const bcrypt = require("bcrypt");
const Candidatura = require("../models/candidaturaModel");
const Swal = require('sweetalert2');


const dashboardEmpresa = async (req, res) => {
    
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
        user: req.session.user, 
        message: 'Bem-vindo ao seu painel, Empresa!',
        style: 'empresaDashboar.css',
        empresaId,
        candidatos: candidatosComImagens
    });
};

//rota para a página de cadastro de empresa
const getCadastroEmpresa = async (req, res) => {
    res.render('fun/reg_empresa', {
      title: 'Registro de Empresa',
      style: 'reg_empresa.css'
    });
};

// Função ler (lista todas as empresas cadastradas)
const getEmpresas = async (req, res) => {
    try{
        const empresas = await Empresa.find({});
        res.status(200).json(empresas)
    }catch(error){
        res.status(500).json({message: "Erro ao buscar empresas!"})
    }
}

//Função ler (busca apenas uma empresa)
const getEmpresa = async (req, res)=> {
    try{
        const { id } = req.params;
        const empresa = await Empresa.findById(id);

        
        if(!empresa){
            res.status(404).json({message: "Empresa não encontrada!"})
        }

        res.status(200).json(empresa);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}


const createEmpresa = async (req, res) => {
    try{
        
        // verifica se há alguma empresa existente
        const empresa = await Empresa.findOne({ cnpj: req.body.cnpj });
        
        if(empresa){
            return res.status(409).json({ message: "Empresa já cadastrada!" })
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
    
    }catch (error){
        
        if (error.code == 11000){
            return res.status(409).json({ message: "Empresa já cadastrada!" })
        } 
        res.status(500).json({message: error.message})
    }
}

// Função Update (atualiza uma empresa)
const updateEmpresa = async (req, res) => {
    try{
        const { id } = req.params;
        const upEmpresa = await Empresa.findByIdAndUpdate(id, req.body);

        if(!upEmpresa){
            res.status(404).json({message: "Empresa não encontrada!"})
        }

        res.status(200).json(upEmpresa);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Função deletar (apaga uma empresa)
const deleteEmpresa = async (req, res) => {
    try{
        const { id } = req.params;
        const delEmpresa = await Empresa.findByIdAndDelete(id);

        
        if(!delEmpresa){
            return res.status(404).json({message: "Empresa não encontrada!"});
        }

        res.status(200).json({message: "Empresa deletada com sucesso"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const criarVagaParaEmpresa = async (req, res) => {
    try {
        const { empresaId } = req.params;
        const { nome, area, requisitos } = req.body;

        // Busca a empresa pelo ID
        const empresa = await Empresa.findById(empresaId);
        if (!empresa) {
            return res.status(404).send({ message: 'Empresa não encontrada!' });
        }

        // Criação da vaga
        const novaVaga = new Vagas({
            nome,
            area,
            requisitos,
            imagem: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
            empresa: empresa._id
        });

        // Salva a vaga no banco de dados
        await novaVaga.save();

        // Adiciona o ID da vaga ao array de vagas da empresa
        empresa.vagas.push(novaVaga._id);
        await empresa.save();

        // Redireciona com uma mensagem de sucesso
        res.redirect(`/empresa/${empresaId}/vagas/criar?success=true`);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao criar vaga para a empresa: ' + err.message });
    }
};


const buscacandidatos = async (req, res) => {
    try {
        const { q } = req.query; // Obtém o termo de busca

        // Filtra os candidatos com base na qualificação ou educação
        const candidatos = await candidato.find({
            $or: [
                { qualificacao: { $regex: q, $options: 'i' } }, // Busca no campo "qualificacao"
                { educacao: { $regex: q, $options: 'i' } }      // Busca no campo "educacao"
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
        res.render('fun/resultCanddidatos', { candidatos: candidatosComImagens, query: q });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar candidatos', error: err.message });
    }
};

const updateStatus = c= async (req, res) => {
    try {
        const empresaId = req.params.empresaId;
        const { id } = req.params; // ID da candidatura a ser atualizada
        const { status } = req.body; // Novo status enviado pelo formulário ou requisição

        // Verifica se o status é válido
        if (!['Pendente', 'Aceito', 'Rejeitado'].includes(status)) {
            return res.status(400).send({ message: 'Status inválido!' });
        }

        // Atualiza o status da candidatura
        const candidaturaAtualizada = await Candidatura.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Retorna o documento atualizado
        );

        if (!candidaturaAtualizada) {
            return res.status(404).send({ message: 'Candidatura não encontrada!' });
        }

        res.redirect('/empresa/dashboard');
    } catch (error) {
        console.error('Erro ao atualizar o status da candidatura:', error);
        res.status(500).send({ message: 'Erro ao atualizar o status da candidatura', error: error.message });
    }
};



  
module.exports = {
    getCadastroEmpresa,
    getEmpresas,
    getEmpresa,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    dashboardEmpresa,
    criarVagaParaEmpresa,
    buscacandidatos,
    updateStatus,
}