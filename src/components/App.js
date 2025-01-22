import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SarahPage from './SarahPage';
import Home from './Home';
import Games from './Games';


function App() {
  if (window.location.host.split(".")[0] === "games") {
    return (
      <Routes>
        <Route path="/" element={<Games />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sarah" element={<SarahPage />} />
      </Routes>
    );
  }
  
}

export default App;
