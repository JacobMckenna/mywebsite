
import '../styles/Home.css';


function Welcome() {
    return (
      <div className="profile-container">
        <img src={process.env.PUBLIC_URL + '/profile.jpg'} alt="Profile" className="profile-photo" />
        <h1 className="name">Jacob Mckenna</h1>
        <p className="description">
            Yup, that's me. Welcome to my home sweet home.
            <br />
            Enjoy your stay here. Have a complimentary hot chocolate down below for visiting.
            <br />
            Good luck picking it up though lol!
        </p>
        <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmk1MmsyZWl5OThiajV2Nzl1aHQ3dzJ3Y3VmOW04anJ1bm9tNXAyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L2NVl4obS7OgKUcuza/giphy.gif"
            alt="Hot Chocolate GIF"
            className="hot-chocolate-gif"
        />
        </div>
    );
  }


export default Welcome;
