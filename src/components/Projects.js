import '../styles/Projects.css';
import '../styles/Home.css';

function Projects() {
    const projects = [
        {
            name: "Portfolio Website",
            description: "A personal portfolio showcasing my projects and skills.",
            image: process.env.PUBLIC_URL + '/Portfolio.png',
            link: "https://github.com/JacobMckenna/mywebsite"
        },
        {
            name: "GeoJob Search",
            description: "A full-stack web app for job searching with geographical aid.",
            image: process.env.PUBLIC_URL + '/GeoJobSearch.png',
            link: "https://github.com/JacobMckenna/GeoJob-Search" 
        },
        {
            name: "Unbeatable Tic Tac Toe AI",
            description: "AI that uses an optimized Minimax algorithm that cannot be beaten.",
            image: process.env.PUBLIC_URL + '/TicTacToe.jpg',
            link: "https://github.com/JacobMckenna/Unbeatable-TicTacToe"
        }
    ];

    return (
        <div className="section-container">
            <h1 className="title">Projects</h1>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <a 
                        key={index} 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-card"
                    >
                        <img src={project.image} alt={project.name} className="project-image" />
                        <h2 className="project-name">{project.name}</h2>
                        <p className="project-description">{project.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Projects;
