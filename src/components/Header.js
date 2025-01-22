import React from 'react';
import { Link } from 'react-router-dom';  // Import useNavigate
import '../styles/header.css';  // Assuming you might have a specific style for the header

function Header() {

  return (
    <header className="header">
        <Link to="/">
            <button className="special-button">Home</button>
        </Link>
        <Link>
            <button className="special-button">Games</button>
        </Link>
        <Link to="/sarah">
            <button className="special-button">Special</button>
        </Link>
    </header>
  );
}

export default Header;
