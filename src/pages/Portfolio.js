import Header from '../components/Header.js'; 
import Footer from '../components/Footer.js';
import '../styles/Home.css';
import Welcome from '../components/Welcome.js';
import Projects from '../components/Projects.js';
import Education from '../components/Education.js';
import Skills from '../components/Skills.js';


function Portfolio() {
    return (
      <div className="app-container">
        <Header />
        <Welcome />
        <Projects />
        <Skills />
        <Education />
        <Footer />
      </div>
    );
  }


export default Portfolio;
