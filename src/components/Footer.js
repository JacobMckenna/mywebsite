import React from 'react';
import '../styles/footer.css'; // Assuming you have this CSS file

function Footer() {
  return (
    <>
      {/* Pagebreak line */}
      <hr className="pagebreak" />
      {/* Footer */}
      <footer className="footer">
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="dont-click-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Don't click me
        </a>
      </footer>
    </>
  );
}

export default Footer;
