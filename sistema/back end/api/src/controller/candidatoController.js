const Candidato = require('../models/candidatoModel.js');
const Vaga = require('../models/vagasModel.js');
const Empresa = require('../models/empresaModel.js');
const Candidatura = require('../models/candidaturaModel.js');
const bcrypt = require('bcrypt');
const { isAuthenticated } = require('../middleware/auth.js');

function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    if (sideMenu.classList.contains('hidden')) {
      sideMenu.classList.remove('hidden');
      sideMenu.classList.add('visible');
    } else {
      sideMenu.classList.remove('visible');
      sideMenu.classList.add('hidden');
    }
  }
  

const dashboardCandidato = async (req, res) => {
  const candidatoId = req.session.user.id;

  // Busca todas as vagas e popula os dados da empresa associada
  const vagas = await Vaga.find().populate('empresa');

  // Converte as imagens para base64
  const vagasComImagens = vagas.map(vaga => {
      let imagemBase64 = null;
      if (vaga.imagem && vaga.imagem.data) {
          imagemBase64 = `data:${vaga.imagem.contentType};base64,${vaga.imagem.data.toString('base64')}`;
      }

      return {
          ...vaga._doc,
          imagem: imagemBase64,
      };
  });

  res.render('can/candidatoDashboard', {
      user: req.session.user,
      message: 'Bem-vindo ao seu painel, Candidato!',
      style: 'candidatoDashboar.css',
      candidatoId,
      vagas: vagasComImagens,
  });
};

//rota para a página de cadastro de candidato
const getCadastroCandidato = async (req, res) => {
    res.render('can/reg_candidato', {
      title: 'Registro de Candidato',
      style: 'reg_candidato.css'
    });
};

//Rota privada do perfil do usuário para testes de autenticação
/*const getPerfilCandidato = async (req, res) => {
    const id = req.params.id

    const user = await Candidato.findById(id, '-senha')
  
    if(!user){
      return res.status(404).send("Usuário não encontrado")
    }
  
    res.status(200).json({user})
}*/
const getPerfilCandidato = async (req, res) => {
    try {
        const id = req.params.id;
        const candidato = await Candidato.findById(id, '-senha');

        if (!candidato) {
            return res.status(404).send("Candidato não encontrado");
        }

        res.render('can/getPerfil', {
            user: candidato,
            //style: 'getPerfil', 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro no servidor");
    }
};


//validação de cadastro de candidato
const cadastroCandidato = async (req, res) => {
    //Caso seja usado o "confirmar senha"
    /*if(senha != confirmarSenha){
        return res.status(422).json({mgs:"As senhas não confere!"})
    }*/

    const userExiste = await Candidato.findOne({email: req.body.email})
  
    if(userExiste){
      return res.status(422).json({mgs:"Email já utilizado no sistema. Por favor, escolher outro."})
    }
  
    //proteção de senha 
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(req.body.senha, salt)
  
    try {
      const novoCandidato = new Candidato({
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: senhaHash,
        telefone: req.body.telefone,
        educacao: req.body.educacao,
        qualificacao: req.body.qualificacoes,
        cursos: req.body.cursos,
        descricao: req.body.descricao,
        habilidadesTecnicas: req.body.habilidades,
        idiomas: req.body.idiomas,
        imagem: req.file ?{ data: req.file.buffer, contentType: req.file.mimetype }: undefined

      });
      
      await novoCandidato.save();
      res.redirect('/home');

    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao cadastrar o candidato.");
    }
};


// Controlador para buscar uma vaga específica pelo ID
const verVaga = async (req, res) => {
    try {
        // Obtém o ID da vaga a partir dos parâmetros da URL
        const { id } = req.params;
        const candidatoId = req.session.user.id;

        // Busca a vaga pelo ID e popula os dados da empresa associada
        const vaga = await Vaga.findById(id).populate('empresa');

        // Verifica se a vaga foi encontrada
        if (!vaga) {
            return res.status(404).send({ message: 'Vaga não encontrada!' });
        }

        // Converte a imagem em Base64 (se existir)
        let imagemBase64 = null;
        if (vaga.imagem && vaga.imagem.data) {
            imagemBase64 = `data:${vaga.imagem.contentType};base64,${vaga.imagem.data.toString('base64')}`;
        }

        // Renderiza o template para exibir os detalhes da vaga
        res.render('can/vagaDetalhes', {
            _id: vaga._id,
            nome: vaga.nome,
            area: vaga.area,
            requisitos: vaga.requisitos,
            empresa: vaga.empresa.nome, // Nome da empresa associada
            imagem: imagemBase64,
            candidatoId // Imagem em Base64
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar a vaga', error: err.message });
    }
};


// Rota para buscar vagas
const buscarvagas = async (req, res) => {
    try {
        const { q } = req.query;

        // Filtra as vagas com base no nome ou área
        const vagas = await Vaga.find({
            $or: [
                { nome: { $regex: q, $options: 'i' } },
                { area: { $regex: q, $options: 'i' } }
            ]
        }).populate('empresa');

        // Converte as imagens para Base64
        const vagasComImagens = vagas.map(vaga => {
            let imagemBase64 = null;
            if (vaga.imagem && vaga.imagem.data) {
                imagemBase64 = `data:${vaga.imagem.contentType};base64,${vaga.imagem.data.toString('base64')}`;
            }

            return {
                ...vaga._doc,
                imagem: imagemBase64,
            };
        });

        res.render('can/resultVagas', { vagas: vagasComImagens, query: q });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar vagas', error: err.message });
    }
};

const candidatarse = async (req, res) => {
    try {
        // Obtém o ID da vaga a partir dos parâmetros da URL
        const { id } = req.params;
        const candidatoId = req.session.user.id

        // Valida se o ID do candidato existe na sessão
        if (!candidatoId) {
            console.error("ID do candidato não encontrado na sessão.");
            return res.status(400).send({ message: 'Usuário não autenticado!' });
        }

        // Busca a vaga pelo ID e popula os dados da empresa associada
        console.log('aqui chama candidatarse')
        const vaga = await Vaga.findById(id).populate('empresa');
        if (!vaga) {
            console.error("Vaga não encontrada:", id);
            return res.status(404).send({ message: 'Vaga não encontrada!' });
        }

        // Busca o candidato pelo ID
        const candidato = await Candidato.findById(candidatoId);
        if (!candidato) {
            console.error("Candidato não encontrado:", candidatoId);
            return res.status(404).send({ message: 'Candidato não encontrado!' });
        }

        // Verifica se já existe uma candidatura para essa vaga
        const candidaturaExistente = await Candidatura.findOne({
            candidato: candidato._id,
            vaga: vaga._id
        });

        if (candidaturaExistente) {
            console.warn("Candidatura já realizada para esta vaga.");
            return res.status(400).send({ message: 'Você já se candidatou a esta vaga!' });
        }

        // Cria uma nova candidatura
        const novaCandidatura = new Candidatura({
            candidato: candidato._id,
            vaga: vaga._id,
            empresa: vaga.empresa._id,
            status: 'Pendente'
        });

        // Salva a nova candidatura no banco de dados
        await novaCandidatura.save();

        // Converte a imagem em Base64 (se existir)
        let imagemBase64 = null;
        if (vaga.imagem && vaga.imagem.data) {
            imagemBase64 = `data:${vaga.imagem.contentType};base64,${vaga.imagem.data.toString('base64')}`;
            console.log("Imagem convertida para Base64.");
        }

        // Renderiza os detalhes da candidatura e da vaga
        res.render('can/candidatura', {
            _id: novaCandidatura._id,
            vaga,
            empresa: vaga.empresa.nome, // Nome da empresa associada
            imagem: imagemBase64, // Imagem em Base64
            status: novaCandidatura.status,
            candidato,
            candidatoId: novaCandidatura.candidato
        })

    } catch (err) {
        console.error("Erro ao realizar a candidatura:", err);
        res.status(500).send({ message: 'Erro ao realizar a candidatura', error: err.message });
    }
};

const verCandidatura = async (req, res) => {
    try {
        // Obtém o ID da candidatura a partir dos parâmetros da URL
        const { id } = req.params;

        // Busca a candidatura pelo ID e popula os dados relacionados (vaga e candidato)
        const candidatura = await Candidatura.findById(id)
            .populate({
                path: 'vaga',
                populate: { path: 'empresa' } // Popula também os detalhes da empresa associada à vaga
            })
            .populate('candidato'); // Popula os detalhes do candidato

        // Verifica se a candidatura foi encontrada
        if (!candidatura) {
            return res.status(404).send({ message: 'Candidatura não encontrada!' });
        }

        // Verifica se os dados necessários estão disponíveis
        if (!candidatura.vaga || !candidatura.candidato) {
            return res.status(400).send({ message: 'Dados incompletos na candidatura!' });
        }

        // Converte a imagem da vaga em Base64 (se existir)
        let imagemBase64 = null;
        if (candidatura.vaga.imagem && candidatura.vaga.imagem.data) {
            imagemBase64 = `data:${candidatura.vaga.imagem.contentType};base64,${candidatura.vaga.imagem.data.toString('base64')}`;
        }

        // Renderiza o template para exibir os detalhes da candidatura
        res.render('can/candidatura', {
            vagaNome: candidatura.vaga.nome || 'Não informado',
            vagaArea: candidatura.vaga.area || 'Não informado',
            vagaRequisitos: candidatura.vaga.requisitos || 'Não informado',
            empresa: candidatura.vaga.empresa?.nome || 'Não informado', // Nome da empresa associada à vaga
            candidatoNome: candidatura.candidato.nome || 'Não informado', // Nome do candidato
            status: candidatura.status || 'Não informado',
            imagem: imagemBase64, // Imagem da vaga em Base64
        });

    } catch (err) {
        console.error("Erro ao buscar a candidatura:", err);
        res.status(500).send({ message: 'Erro ao buscar a candidatura', error: err.message });
    }
};

const cancelarCandidatura = async (req,res) => {
    try{
        const candidaturaId = req.params.candidaturaId;

        const candidatura = await Candidatura.findByIdAndDelete(candidaturaId)

        if(!candidatura) {
            return res.status(400).send({ message: 'Candidatura não encontrada!' });
        }

        res.redirect('/candidato/dashboard');
    }catch (error) {
        console.error('Erro ao cancelar a candidatura:', error);
        res.status(500).send({ message: 'Erro ao cancelar a candidatura', error: error.message });
    }
}

const editarPerfilCandidato = async (req, res) => {
    try {
        const candidatoId = req.params.id;
        const { nome, cpf, email, telefone, educacao, qualificacao, cursos, descricao, habilidadesTecnicas, idiomas } = req.body;

        // Encontrar o candidato pelo ID
        const candidato = await Candidato.findById(candidatoId);

        if (!candidato) {
            return res.status(404).send({ message: 'Candidato não encontrado!' });
        }

        // Atualizar os dados do candidato
        candidato.nome = nome || candidato.nome;
        candidato.cpf = cpf || candidato.cpf;
        candidato.email = email || candidato.email;
        candidato.telefone = telefone || candidato.telefone;
        candidato.educacao = educacao || candidato.educacao;
        candidato.qualificacao = qualificacao || candidato.qualificacao;
        candidato.cursos = cursos || candidato.cursos;
        candidato.descricao = descricao || candidato.descricao;
        candidato.habilidadesTecnicas = habilidadesTecnicas || candidato.habilidadesTecnicas;
        candidato.idiomas = idiomas || candidato.idiomas;

        // Salvar as alterações no banco de dados
        await candidato.save();

        res.redirect(`/candidato/perfil/${candidatoId}`);
    } catch (error) {
        console.error("Erro ao editar o perfil:", error);
        res.status(500).send({ message: 'Erro ao editar o perfil', error: error.message });
    }
};





module.exports = {
    dashboardCandidato,
    getCadastroCandidato,
    getPerfilCandidato,
    cadastroCandidato,
    verVaga,
    buscarvagas,
    candidatarse,
    verCandidatura,
    cancelarCandidatura,
    editarPerfilCandidato,
    isAuthenticated
};