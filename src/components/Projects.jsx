import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Projects.css";

function Projects() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const els = cardsRef.current.filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="projects-container" id="projects">
      <h2 className="projects-title">Projects</h2>
      <p className="projects-subtitle">Some stuff I've built recently.</p>

      <div className="projects-grid">
        <Link to="/tictactoe" className="project-link">
          <article
            className="project-card"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <div className="project-media">
              <div className="project-badge">New</div>
              <img
                className="project-image"
                src="/images/tictactoe-preview.png"
                alt="Unbeatable Tic-Tac-Toe AI preview"
              />
            </div>

            <div className="project-body">
              <h3 className="project-name highlight">
                Unbeatable Tic-Tac-Toe AI
              </h3>
              <p className="project-description">
                Play against a Python (Pyodide) minimax bot with bitboards +
                transposition table. Live stats tracked in Firebase.
              </p>
              <div className="project-cta">Play now →</div>
            </div>
          </article>
        </Link>

        {/* Keep your other existing project cards here.
            For each card, add a ref like cardsRef.current[1], [2], etc. */}
      </div>
    </section>
  );
}

export default Projects;
