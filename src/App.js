import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sarah" element={<SarahPage />} />
    </Routes>
  );
}

function Home() {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/sarah">
          <button className="special-button">Special</button>
        </Link>
      </header>
      <div className="profile-container">
        <img src="https://raw.githubusercontent.com/JacobMckenna/mywebsite/refs/heads/master/src/profile.jpg?token=GHSAT0AAAAAAC5IVD5HIFHBZFEN7LG7BWQ6Z4FPC2A" alt="Profile" className="profile-photo" />
        <h1 className="name">Jacob Mckenna</h1>
        <p className="description">
          Yup, that's me. Welcome to my home sweet home.
          <br />
          Enjoy your stay here. Have a complimentary hot chocolate down below for visiting.
          <br />
          Good luck picking it up though!
        </p>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmk1MmsyZWl5OThiajV2Nzl1aHQ3dzJ3Y3VmOW04anJ1bm9tNXAyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L2NVl4obS7OgKUcuza/giphy.gif"
          alt="Hot Chocolate GIF"
          className="hot-chocolate-gif"
        />
        <p className="source-link">
          <a
            href="https://giphy.com/stickers/cup-hot-chocolate-zandraart-L2NVl4obS7OgKUcuza"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </p>
      </div>
    </div>
  );
}

function SarahPage() {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/">
          <button className="special-button">Back</button>
        </Link>
      </header>
      <div className="profile-container">
        <h1 className="name">Welcome to Sarah's Page!</h1>
        <p className="description">
          This page is under construction, but stay tuned for more!
        </p>
      </div>
    </div>
  );
}

export default App;
