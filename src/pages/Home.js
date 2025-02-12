import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer';
import '../styles/Home.css';
import Welcome from '../components/Welcome';


function Home() {
    return (
      <div className="app-container">
        <Header />
        <Welcome />
        <Footer />
      </div>
    );
  }


export default Home;
