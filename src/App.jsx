import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy } from 'react';
import Selector from './components/Header/Selector';
import Ayuda from './components/Ayuda';
import { Divider } from 'antd';
import PieDePagina from './components/PieDePagina';


const Home = lazy(() => import('./pages/Home'));
const Piezas = lazy(() => import('./pages/Piezas'));
const Motherboards = lazy(() => import('./pages/Motherboards'));

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Piezas" element={<Piezas />} />
          <Route path="/Motherboards" element={<Motherboards />} />
        </Routes>
      </Router>
      <Selector />
      <Ayuda />
      <PieDePagina/>
    </>
  );
};

export default App;
