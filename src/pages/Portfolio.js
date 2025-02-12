import Header from '../components/Header'; 
import Footer from '../components/Footer';
import '../styles/Home.css';
import Welcome from '../components/Welcome';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Skills from '../components/Skills';


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
