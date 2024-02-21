// Importa BrowserRouter o HashRouter desde 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Piezas = lazy(() => import('./pages/Piezas'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Piezas" element={<Piezas />} />
      </Routes>
    </Router>
  );
};

export default App;
