import express from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()

const prisma = new PrismaClient()
const {Empresa } = require('../../models/model');

// listar empresas (get)
router.get('/empresas', async (req, res) => {
  try {
      const empresas = await Empresa.find();
      res.status(200).json(empresas);
  } catch (error) {
      res.status(500).json({ message: "Erro ao buscar empresas", error });
  }
});

// criar empresa (post)
router.post('/empresa/registro', async (req, res) => {
  const empresaData = req.body

  try {
      await prisma.user.create({
        data: {
          name: empresaData.name,
          email: empresaData.data.email,
          cnpj: empresaData.cnpj,
          fone: empresaData.fone,
          bio: empresaData.bio,
          site: empresaData.site
          },
        },
    )
      res.status(201).json(empresaData);
  } catch (error) {
      res.status(500).json({ message: "Erro ao criar a empresa", error });
  }
});

// login empresa (post)
router.post('/empresa/login', async (req, res) => {
  const empresaData = req.body
  try{
    const empresa = await prisma.empresa.findUnique({
      where: { cnpj: empresaData.cnpj}
    })

    if(!empresa){
      return res.status(404).json({ message: "Empresa não encontrada!", error })
    }

    res.status(201).json(empresaData);
  } catch (error) {
    res.status(500).json({ message: "Erro ao logar no sistema!", error })
  }
})

// atualizar empresa (update)
router.put('/empresa/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
      const updatedEmpresa = await Empresa.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedEmpresa) {
          return res.status(404).json({ message: "Empresa não encontrada" });
      }
      res.status(200).json(updatedEmpresa);
  } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar a empresa", error });
  }
});

// deletar empresa (delete)
router.delete('/empresa/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const empresa = await prisma.empresa.findUnique({
      where: { cnpj: empresaData.cnpj}
    })
      if(!empresa){
        return res.status(404).json({ message: "Empresa não encontrada!", error })
      }
      
      res.status(200).json({ message: "Empresa excluída com sucesso" });
  } catch (error) {
      res.status(500).json({ message: "Erro ao excluir empresa", error });
  }
});

module.exports = router