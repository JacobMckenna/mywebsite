import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <>
      {/* Pagebreak line */}
      <hr className="pagebreak" />
      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <a
            href="mailto:jrjmckenna@outlook.com"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/mail.png" alt="mail"/>
          </a>
          <a
            href="https://www.linkedin.com/in/jrjmckenna/"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i class="devicon-linkedin-plain colored"></i>
          </a>
          <a
            href="https://github.com/JacobMckenna"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i class="devicon-github-original-wordmark colored"></i>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
