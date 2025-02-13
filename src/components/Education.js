import '../styles/Education.css';
import '../styles/Home.css';

function Education() {
    const educationList = [
        {
            institution: "University of Guelph",
            degree: "Bachelor of Computing, Honours Major Computer Science, Minor in Applied Geomatics",
            years: "2021 - 2026",
            image: process.env.PUBLIC_URL + '/uoguelph.jpg'
        },
        {
            institution: "Preston High School",
            degree: "Ontario Secondary School Diploma, Ontario Scholar",
            years: "2017 - 2021",
            image: process.env.PUBLIC_URL + '/prestonhs.jpg'
        }
    ];

    return (
        <div className="section-container">
            <h1 className="title">Education</h1>
            <div className="education-grid">
                {educationList.map((edu, index) => (
                    <div key={index} className="education-card">
                        <img src={edu.image} alt={edu.institution} className="education-image" />
                        <h2 className="education-institution">{edu.institution}</h2>
                        <p className="education-degree">{edu.degree}</p>
                        <p className="education-years">{edu.years}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Education;