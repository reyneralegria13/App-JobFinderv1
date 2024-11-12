import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EscolherCargo from './pages/EscolherCargo'
import Login from './pages/Candidato/Login'
import Cadastro from './pages/Candidato/Registro'
import LoginEmpregador from './pages/Empregador/Login'
import CadastroEmpregador from './pages/Empregador/Registro'
import EsquecerSenha from './pages/EsquecerSenha'

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