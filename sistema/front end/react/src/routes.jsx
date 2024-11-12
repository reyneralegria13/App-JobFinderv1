import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index.jsx'
import EscolherCargo from './pages/EscolherCargo/index.jsx'
import Login from './pages/Candidato/Login/index.jsx'
import Cadastro from './pages/Candidato/Registro/index.jsx'
import LoginEmpregador from './pages/Empregador/Login/index.jsx'
import CadastroEmpregador from './pages/Empregador/Registro/index.jsx'
import EsquecerSenha from './pages/EsquecerSenha/index.jsx'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/escolherCargo' element={<EscolherCargo/>} />
        <Route path="/candidato/login" element={<Login />} />
        <Route path="/candidato/cadastro" element={<Cadastro />} />
        <Route path="/empregador/login" element={<LoginEmpregador />} />
        <Route path="/empregador/cadastro" element={<CadastroEmpregador />} />
        <Route path='/esquecerSenha' element={<EsquecerSenha/>} />
    </Routes>
  );
};

export default MainRoutes;