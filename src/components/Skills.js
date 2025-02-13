import React from "react";
import '../styles/Skills.css';
import '../styles/Home.css';

const Skills = () => {
  return (
    <div className="section-container">
      <h1 className="skills-title">Technical Skills</h1>
      
      <div className="skills-list">
        <div className="skill-item">
          <h3 className="skill-name">Languages</h3>
          <div className="skill-icon">
            <i className="devicon-java-plain colored"></i>
            <i className="devicon-python-plain colored"></i>
            <i className="devicon-c-plain colored"></i>
            <i className="devicon-cplusplus-plain colored"></i>
            <i className="devicon-csharp-plain colored"></i>
            <i className="devicon-mysql-original colored"></i>
            <i className="devicon-postgresql-plain colored"></i>
            <i className="devicon-sqlite-plain colored"></i>
            <i className="devicon-javascript-plain colored"></i>
            <i className="devicon-html5-plain colored"></i>
            <i className="devicon-css3-plain colored"></i>
            <i className="devicon-r-plain colored"></i>
          </div>
        </div>
        
        <div className="skill-item">
          <h3 className="skill-name">Frameworks</h3>
          <div className="skill-icon">
            <i className="devicon-react-original colored"></i>
            <i className="devicon-spring-original colored"></i>
            <i className="devicon-nodejs-plain colored"></i>
            <i className="devicon-flask-original colored"></i>
            <i className="devicon-junit-plain colored"></i>
            <i className="devicon-flutter-plain colored"></i>
            <i className="devicon-bootstrap-plain colored"></i>
            <i className="devicon-tailwindcss-original colored"></i>
          </div>
        </div>
        
        <div className="skill-item">
          <h3 className="skill-name">Dev Tools</h3>
          <div className="skill-icon">
            <i className="devicon-git-plain colored"></i>
            <i className="devicon-githubactions-plain colored"></i>
            <i className="devicon-docker-plain colored"></i>
            <i className="devicon-firebase-plain colored"></i>
            <i className="devicon-vscode-plain colored"></i>
            <i className="devicon-googlecloud-plain colored"></i>
            <i className="devicon-swagger-plain colored"></i>
          </div>
        </div>
        
        <div className="skill-item">
          <h3 className="skill-name">Libraries</h3>
          <div className="skill-icon">
            <i className="devicon-pandas-plain colored"></i>
            <i className="devicon-numpy-plain colored"></i>
            <i className="devicon-sqlalchemy-plain colored"></i>
            <i className="devicon-selenium-original colored"></i>
            <i className="devicon-matplotlib-plain colored"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
