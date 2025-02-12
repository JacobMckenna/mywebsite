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
          <div class="skill-icon">
            <i class="devicon-java-plain colored"></i>
            <i class="devicon-python-plain colored"></i>
            <i class="devicon-c-plain colored"></i>
            <i class="devicon-cplusplus-plain colored"></i>
            <i class="devicon-csharp-plain colored"></i>
            <i class="devicon-mysql-original colored"></i>
            <i class="devicon-postgresql-plain colored"></i>
            <i class="devicon-sqlite-plain colored"></i>
            <i class="devicon-javascript-plain colored"></i>
            <i class="devicon-html5-plain colored"></i>
            <i class="devicon-css3-plain colored"></i>
            <i class="devicon-r-plain colored"></i>
          </div>
        </div>
        
        <div className="skill-item">
          <h3 className="skill-name">Frameworks</h3>
          <div class="skill-icon">
            <i class="devicon-react-original colored"></i>
            <i class="devicon-spring-original colored"></i>
            <i class="devicon-nodejs-plain colored"></i>
            <i class="devicon-flask-original colored"></i>
            <i class="devicon-junit-plain colored"></i>
            <i class="devicon-flutter-plain colored"></i>
            <i class="devicon-bootstrap-plain colored"></i>
            <i class="devicon-tailwindcss-original colored"></i>
          </div>
        </div>
        
        <div className="skill-item">
          <h3 className="skill-name">Dev Tools</h3>
          <div class="skill-icon">
            <i class="devicon-git-plain colored"></i>
            <i class="devicon-githubactions-plain colored"></i>
            <i class="devicon-docker-plain colored"></i>
            <i class="devicon-firebase-plain colored"></i>
            <i class="devicon-vscode-plain colored"></i>
            <i class="devicon-googlecloud-plain colored"></i>
            <i class="devicon-swagger-plain colored"></i>
          </div>
        </div>
        
        <div className="skill-item">
          <h3 className="skill-name">Libraries</h3>
          <div class="skill-icon">
            <i class="devicon-pandas-plain colored"></i>
            <i class="devicon-numpy-plain colored"></i>
            <i class="devicon-sqlalchemy-plain colored"></i>
            <i class="devicon-selenium-original colored"></i>
            <i class="devicon-matplotlib-plain colored"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
