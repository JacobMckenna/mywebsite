import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SpecialPage from '../pages/SpecialPage.js';
import TheButton from '../pages/TheButton.js';
import Games from '../pages/Games.js';
import Portfolio from '../pages/Portfolio.js';


function App() {
  if (window.location.host.split(".")[0] === "games") {
    return (
      // games subdomain
      <Routes>
        <Route path="/" element={<Games />} />
      </Routes>
    );
  } else {
    return (
      // main domain
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/button" element={<TheButton />} />
        <Route path="/sarah" element={<SpecialPage />} />
      </Routes>
    );
  }
  
}

export default App;
