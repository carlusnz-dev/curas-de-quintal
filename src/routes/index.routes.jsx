import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Planta from '../pages/Planta';

const AppRoutes = () => {
     return (
          <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/planta/:id" element={<Planta />} />
          </Routes>
     );
};

export default AppRoutes;
