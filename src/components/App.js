import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SpecialPage from '../pages/SpecialPage.js';
import TheButton from '../pages/TheButton.js';
import Games from '../pages/Games.js';
import Portfolio from '../pages/Portfolio.js';
import TicTacToeAIPage from "../pages/TicTacToeAIPage";
import ScrollToTop from "../components/ScrollToTop";



function App() {
  return (
    <>
      <ScrollToTop />

      {window.location.host.split(".")[0] === "games" ? (
        // games subdomain
        <Routes>
          <Route path="/" element={<Games />} />
        </Routes>
      ) : (
        // main domain
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/button" element={<TheButton />} />
          <Route path="/sarah" element={<SpecialPage />} />
          <Route path="/tictactoe" element={<TicTacToeAIPage />} />
        </Routes>
      )}
    </>
  );
}


export default App;
