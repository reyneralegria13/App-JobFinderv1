const Application = require('../models/relacaoModel');
const Vaga = require('../models/vagasModel');
const Candidato = require('../models/candidatoModel');
const Empresa = require('../models/empresaModel');

// Inscrição em uma vaga
const applyToJob = async (req, res) => {
  try {
    const { vagaId } = req.params;
    const candidatoId = req.session.user.id;

    const vaga = await Vaga.findById(vagaId).populate('empresa');
    if (!vaga) {
      return res.status(404).json({ message: 'Vaga não encontrada!' });
    }

    const application = new Application({
      candidato: candidatoId,
      vaga: vaga._id,
      empresa: vaga.empresa._id,
    });

    await application.save();
    res.status(201).json({ message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao se inscrever na vaga.', error });
  }
};

// Atualizar status da inscrição (Aceitar ou Rejeitar)
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Inscrição não encontrada!' });
    }

    application.status = status;
    await application.save();
    res.status(200).json({ message: `Inscrição ${status.toLowerCase()} com sucesso!` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o status da inscrição.', error });
  }
};

// Enviar mensagem no chat
const sendMessage = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { sender, message } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Inscrição não encontrada!' });
    }

    application.chat.push({ sender, message });
    await application.save();
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar mensagem.', error });
  }
};

// Obter detalhes da inscrição (incluindo chat)
const getApplicationDetails = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('candidato')
      .populate('vaga')
      .populate('empresa');

    if (!application) {
      return res.status(404).json({ message: 'Inscrição não encontrada!' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhes da inscrição.', error });
  }
};

module.exports = { applyToJob, updateApplicationStatus, sendMessage, getApplicationDetails };