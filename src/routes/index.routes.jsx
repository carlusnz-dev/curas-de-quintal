import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Planta from '../pages/Planta';
import About from "../pages/About";
import Plantas from "../pages/Plantas";

const AppRoutes = () => {
     return (
          <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/sobre" element={<About />} />
               <Route path="/planta/:id" element={<Planta />} />
               <Route path="/plantas" element={<Plantas />} />
               <Route path="*" element={<Navigate to="/" />} />
          </Routes>
     );
};

export default AppRoutes;
