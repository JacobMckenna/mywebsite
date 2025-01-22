import Header from './Header'; // Import the Header component
import Footer from './Footer';
import '../styles/Home.css';


function Games() {
    return (
      <div className="app-container">
        <Header />
        <div className="profile-container">
          <h1 className="name">Jacob Mckenna</h1>
          <p className="description">
            Welcome to Jacob Mckenna's Games!
          </p>
        </div>
        <Footer />
      </div>
    );
  }


export default Games;
