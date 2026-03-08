import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SpecialPage from './pages/SpecialPage.js';
import Portfolio from './pages/Portfolio.jsx';
import TicTacToeAIPage from "./pages/TicTacToeAIPage.jsx";
import ScrollToTop from "./components/helpers/ScrollToTop.jsx";
import About from "./pages/About";
import MortgageSim from "./pages/MortgageSim";
import DnDHome from './pages/dnd/home';

import "./index.css";




function App() {
  return (
    <>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/sarah" element={<SpecialPage />} />
          <Route path="/tictactoe" element={<TicTacToeAIPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<TicTacToeAIPage />} />
          <Route path="/MortgageSim" element={<MortgageSim />} />
          <Route path="/DnD/home" element={<DnDHome />} />
        </Routes>
    </>
  );
}


export default App;
