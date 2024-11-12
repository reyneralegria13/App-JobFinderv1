// src/routes/mainRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Login from './pages/Candidato/Login';
import EscolherCargo from './pages/EscolherCargo/index';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/escolher-cargo" element={<EscolherCargo />} />
    </Routes>
  );
};

export default MainRoutes;