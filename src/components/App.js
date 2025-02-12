import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SpecialPage from '../pages/SpecialPage';
import TheButton from '../pages/TheButton';
import Games from '../pages/Games';
import Portfolio from '../pages/Portfolio';


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
