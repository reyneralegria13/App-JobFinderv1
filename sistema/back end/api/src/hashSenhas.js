const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Candidato = require('./models/candidatoModel'); // Caminho para o modelo

// Conectar ao banco
mongoose.connect('mongodb://localhost:27017/jobFinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const atualizarSenhas = async () => {
  try {
    const candidatos = await Candidato.find({}); // Busca todos os candidatos

    for (const candidato of candidatos) {
      // Verifica se a senha já está hashada
      if (!candidato.senha.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(candidato.senha, salt);

        // Atualiza a senha no banco
        candidato.senha = senhaHash;
        await candidato.save();

        console.log(`Senha do usuário ${candidato.email} atualizada com sucesso.`);
      }
    }

    console.log('Todas as senhas foram atualizadas.');
    mongoose.connection.close(); // Fecha a conexão com o banco
  } catch (error) {
    console.error('Erro ao atualizar senhas:', error);
  }
};

atualizarSenhas();
