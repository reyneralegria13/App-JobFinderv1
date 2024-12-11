const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');
const Candidatura = require('../models/candidaturaModel');
const Vaga = require('../models/vagasModel');
//const Vaga = require('../models/vagasModel');

// rota para a página home
const getHome = async (req, res) => {
    res.render('fun/home', {
        title: 'home',
        style: 'home.css' 
    });
};

//rota para a página para escolher cargo
const getCargo = async (req, res) => {
    res.render('fun/escolherCargo', {
      title: 'Escolher Cargo',
      style: 'escolherCargo.css'
    });
};

//rota para a pagina de login
const getLogin = async (req, res) => {
    res.render('fun/login', {
      title: 'Login',
      style: 'login.css'
    });
};

const getRecuperarSenha = async (req, res) => {
    res.render('fun/esqueciSenha', {
      title: 'Recuperar Senha',
      style: 'esqueciSenha.css'
    });
};

// GET: Exibir página de redefinição
const getRedefinirSenha = async (req, res) => {
  try {
    const token = req.params.token;

    // Verificar se o token é válido
    const user = 
    await Candidato.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    }) || 
    await Empresa.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido ou expirado.' });
    }

    res.render("fun/redefinirSenha", {
      title: "Redefinir Senha",
      style: "redefinirSenha.css",
      token });
  } catch (err) {
    console.error('Erro ao renderizar a página:', err);
    res.status(500).send(err.message);
  }
};
const getCriarVagas = (req, res) => {
  const { empresaId } = req.params;
  res.render('fun/criarVagas', {
    title: 'Criar Vagas', 
    style: 'criarVagas.css',
    empresaId,
})};

const getVagas = async (req, res) => {
  try {
    const empresaId = req.params.empresaId;
    const empresa = await Empresa.findById(empresaId).populate('vagas');

    if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada!' });
    }

    res.render('fun/vagas', {
        title: "Vagas",
        style: "vagas.css",
        vagas: empresa.vagas,
        empresaId
    })
    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        res.status(500).send(error.message);
    }
}

const getCandidaturas = async (req, res) => {
  try {
    const candidatoId = req.user._id; // Obtém o ID do candidato autenticado
    const candidaturas = await Candidatura.find({ candidato: candidatoId })
        .populate('vaga')
        .populate('empresa');

    res.render('fun/candidaturas', {
        title: 'Minhas Candidaturas',
        style: 'candidaturas.css',
        candidaturas,
    });
    } catch (error) {
        console.error('Erro ao buscar candidaturas:', error);
        res.status(500).send('Erro ao carregar candidaturas.');
    }
};


const getCandidaturasc = async (req, res) => {

  const candidatoId = req.params.candidatoId

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

  const candidaturas = await Candidatura.find({ candidato: candidatoId }).populate('candidato').populate('vaga').populate('empresa');
 
  if(!candidaturas){
      return res.status(404).send({ message: 'Candidaturas nao encontradas!' });
  }

  res.render('can/ver_candidaturas', {
    title: 'Lista de Candidatos',
    style: 'verCandidatura.css',
    candidaturas,
    vagas: vagasComImagens,
    candidatoId
    
  });
};

const Vercandidatos = async (req, res) => {

  const { id } = req.params;

  const candidaturas = await Candidatura.find({ vaga: id }).populate('candidato').populate('vaga').populate('empresa');
 

  if(!candidaturas){
      return res.status(404).send({ message: 'Candidaturas nao encontradas!' });
  }

  res.render('fun/candidatos_vagas', {
    title: 'Lista de Candidatos',
    style: 'candidaturas.css',
    candidaturas,
  });
}

const getVagaDetalhes = async (req, res) => {
  try {
    const candidatoId = req.user._id; // Obtém o ID do candidato autenticado
    const vagaId = req.params.vagaId; // Obtém o ID da vaga da URL

    // Buscar a vaga específica pelo ID
    const vaga = await Vaga.findById(vagaId).populate('empresa'); // Assumindo que a vaga tem referência à empresa

    if (!vaga) {
      return res.status(404).json({ message: 'Vaga não encontrada!' });
    }

    // Renderizar a página com os detalhes da vaga
    res.render('fun/vagaDetalhes', {
      title: 'Detalhes da Vaga',
      style: 'vagaDetalhes.css', // Adapte conforme o seu arquivo de estilo
      vaga, // Passa os detalhes da vaga para a view
      candidatoId
    });

  } catch (error) {
    console.error('Erro ao buscar detalhes da vaga:', error);
    res.status(500).send('Erro ao carregar detalhes da vaga.');
  }

};

const visualizarTelaEdicao = async (req, res) => {
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
        user: candidato,
         });
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar a tela de edição');
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
    getCandidaturasc,
    Vercandidatos,
    visualizarTelaEdicao,
}
