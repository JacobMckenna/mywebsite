import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SarahPage from './SarahPage';
import Home from './Home';
import TheButton from './TheButton';
import Games from './Games';


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
        <Route path="/" element={<Home />} />
        <Route path="/button" element={<TheButton />} />
        <Route path="/sarah" element={<SarahPage />} />
      </Routes>
    );
  }
  
}

export default App;
