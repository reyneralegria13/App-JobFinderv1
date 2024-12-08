const Candidato = require('../models/candidatoModel.js');
const Vaga = require('../models/vagasModel.js');
const Empresa = require('../models/empresaModel.js');
const bcrypt = require('bcrypt')


const dashboardCandidato = async (req, res) => {
  const candidatoId = req.session.user.id;

  // Busca todas as vagas e popula os dados da empresa associada
  const vagas = await Vaga.find().populate('empresa');
  console.log('Vagas encontradas:', vagas); // Log para depuração

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
      style: 'candidatoDashboard.css',
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
const getPerfilCandidato = async (req, res) => {
    const id = req.params.id

    const user = await Candidato.findById(id, '-senha')
  
    if(!user){
      return res.status(404).send("Usuário não encontrado")
    }
  
    res.status(200).json({user})
}

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
            nome: vaga.nome,
            area: vaga.area,
            requisitos: vaga.requisitos,
            empresa: vaga.empresa.nome, // Nome da empresa associada
            imagem: imagemBase64, // Imagem em Base64
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


module.exports = {
    dashboardCandidato,
    getCadastroCandidato,
    getPerfilCandidato,
    cadastroCandidato,
    verVaga,
    buscarvagas,
};