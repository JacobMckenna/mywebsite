import Header from '../components/Header'; 
import Footer from '../components/Footer';
import React, { useState } from "react";

import "../styles/TheButton.css";

function TheButton() {
  const [globalClicks, setGlobalClicks] = useState(0);
  const [sessionClicks, setSessionClicks] = useState(0);

  const handleClick = () => {
    setGlobalClicks((prev) => prev + 1);
    setSessionClicks((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="button-container">
        <button className="massive-red-button" onClick={handleClick}></button>
        <div className="global-counter-text">
          This button has been clicked{" "}
          <span className="global-counter-number">{globalClicks}</span> times.
        </div>
        <div className="session-text">
          You've clicked the button <strong>{sessionClicks}</strong> times this session.
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default TheButton;
