import React from 'react'
import { Routes, Route } from 'react-router-dom'

function mainRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidato/login" element={<Login />} />
        <Route path="/candidato/cadastro" element={<Cadastro />} />
        <Route path="/empregador/login" element={<LoginEmpregador />} />
        <Route path="/empregador/cadastro" element={<CadastroEmpregador />} />
    </Routes>
  )
}

export default mainRoutes