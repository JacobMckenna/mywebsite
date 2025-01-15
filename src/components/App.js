import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SarahPage from './SarahPage';
import Home from './Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sarah" element={<SarahPage />} />
    </Routes>
  );
}

export default App;
