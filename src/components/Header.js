import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {

  return (
    <header className="header">
        <Link to="/">
            <button className="special-button">Home</button>
        </Link>
        {/* <a
            href={
                window.location.hostname === "localhost"
                    ? `http://games.localhost:${window.location.port}` // Replace with the local subdomain's port if needed
                    : `https://games.${window.location.hostname}`
            }
            // target="_blank"
            rel="noopener noreferrer"
        >
            <button className="special-button">Games</button>
        </a> */}
        {/* <Link to="/button">
            <button className="special-button">The Button</button>
        </Link> */}
    </header>
  );
}

export default Header;
