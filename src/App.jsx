import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy } from 'react';
import Selector from './components/Header/Selector';
import Ayuda from './components/Ayuda';

const Home = lazy(() => import('./pages/Home'));
const Piezas = lazy(() => import('./pages/Piezas'));

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Piezas" element={<Piezas />} />
        </Routes>
      </Router>
      <Selector />
      <Ayuda />
    </>
  );
};

export default App;
