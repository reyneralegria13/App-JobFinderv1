const Empresa = require("../models/empresaModel");

// lista todas as empresas cadastradas
const getEmpresas = async (req, res) => {
    try{
        const empresas = await Empresa.find({});
        res.status(200).json(empresas)
    }catch(error){
        res.status(500).json({message: "Erro ao buscar empresas"})
    }
}

// busca apenas uma empresa
const getEmpresa = async (req, res)=> {
    try{
        const { id } = req.params;
        const Empresa = await Empresa.findById(id);
        res.status(200).json(Empresa);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

// cadastra uma empresa
const createEmpresa = async (req, res) => {
    try{
        const Empresa = await Empresa.create(req.body)
        res.status(200).send(Empresa)
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

// atualiza uma empresa
const updateEmpresa = async (req, res) => {
    try{
        const { id } = req.params;

        const Empresa = await Empresa.findByIdAndUpdate(id, req.body);

        if(!Empresa){
            res.status(404).json({message: "Empresa não encontrada"})
        }

        const updateEmpresa = await Empresa.findById(id);
        res.status(200).json(updateEmpresa);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// apaga uma empresa
const deleteEmpresa = async (req, res) => {
    try{
        const { id } = req.params;
        const Empresa = await Empresa.findByIdAndDelete(id);
        if(!Empresa){
            return res.status(404).json({message: "Empresa não encontrada"});
        }

        res.status(200).json({message: "Empresa deletada com sucesso"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// exporta as funções
module.exports = {
    getEmpresas,
    getEmpresa,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa
}