const Empresa = require("../models/empresaModel");

// lista todas as empresas cadastradas
const getEmpresas = async (req, res) => {
    try{
        const empresas = await Empresa.find({});
        res.status(200).json(empresas)
    }catch(error){
        res.status(500).json({message: "Erro ao buscar empresas!"})
    }
}

// busca apenas uma empresa
const getEmpresa = async (req, res)=> {
    try{
        const { id } = req.params;
        const empresa = await Empresa.findById(id);
        res.status(200).json(empresa);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

// cadastra uma empresa
const createEmpresa = async (req, res) => {
    try{
        /// guarda os dados contidos no body
        const {nome, email, cnpj, fone, bio, site} = request.body
        // verifica se os dados sao nulos
        if(!nome || !cnpj || !email || !fone || !site){
            return response.status(400).json({ error : "Erro: Insira todos os campos obrigatórios!"})
        }
        const newEmpresa = await Empresa.create({
            nome: reqbody.nome,
            email: req.body.email,
            cnpj: req.body.cnpj,
            fone: req.body.fone,
            bio: req.body.bio,
            site: req.body.site
        })
        res.status(200).send(newEmpresa)
    }catch (error){
        if (error.code == 11000){
            return res.status(409).json({ message: "Empresa já cadastrada!" })
        } 
        res.status(500).json({message: error.message})
    }
}

// atualiza uma empresa
const updateEmpresa = async (req, res) => {
    try{
        const { id } = req.params;
        const upEmpresa = await Empresa.findByIdAndUpdate(id, req.body);

        if(!upEmpresa){
            res.status(404).json({message: "Empresa não encontrada"})
        }

        res.status(200).json(upEmpresa);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// apaga uma empresa
const deleteEmpresa = async (req, res) => {
    try{
        const { id } = req.params;
        const delEmpresa = await Empresa.findByIdAndDelete(id);

        if(!delEmpresa){
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