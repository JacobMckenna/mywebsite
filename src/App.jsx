import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SpecialPage from './pages/SpecialPage.js';
import Portfolio from './pages/Portfolio.jsx';
import TicTacToeAIPage from "./pages/TicTacToeAIPage.jsx";
import ScrollToTop from "./components/helpers/ScrollToTop.jsx";
import About from "./pages/About";
import MortgageSim from "./pages/MortgageSim";
import BolusCalculator from "./pages/BolusCalculator";

import DnDHome from './pages/dnd/home';
import EpicMomentsPage from './pages/dnd/epic-moments';
import WorldMapPage from './pages/dnd/WorldMapPage';
import SessionsPage from './pages/dnd/sessions';
import QuestLogPage from './pages/dnd/quests';

import "./index.css";

import sessions from "./config/dnd/sessions.json";


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
          <Route path="/bolus" element={<BolusCalculator />} />

          <Route path="/DnD" element={<DnDHome />} />
          <Route path="/DnD/home" element={<DnDHome />} />
          <Route path="/DnD/epic" element={<EpicMomentsPage />} />
          <Route path="/DnD/map" element={<WorldMapPage />} />
          <Route path="/DnD/sessions" element={<SessionsPage sessions={sessions} />} />
          <Route path="/DnD/quests" element={<QuestLogPage/>} />
          
        </Routes>
    </>
  );
}


export default App;
