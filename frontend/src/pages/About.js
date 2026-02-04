import about_video from '../videos/about1.mp4';
import '../css/about.css';
import { NavLink } from 'react-router-dom';

const About = () => {
    return (
        <>
             <div id="video_container">
                            <video src={about_video} autoPlay loop muted>
                            </video>
                        </div>
                        <section id="home_nav">
                            <nav className='home_navbar'>
                                <ul>
                                    <li className='home_list'><NavLink to='/'>Home</NavLink></li>
                                    
                                    <li className='home_list'><NavLink to='/about'>About</NavLink></li>
                                    <li className='home_list'><NavLink to='/jobDescription'>Interview</NavLink></li>
                                    
                                </ul>
                                
                            </nav>
                            
                        </section>
                <main id="about-content">
                    <p>
                        Our AI-powered InterviewPrep tool helps you practice and refine your interview skills with ease. Simply input a job posting, and our system will generate tailored questions based on the role’s requirements. Once you have your questions, record and upload your video response to simulate a real interview experience. Our AI then analyzes your answers, providing detailed feedback on clarity, pacing, and how well you address key job requirements. This smart and interactive approach ensures you're fully prepared to make a strong impression on hiring managers. Get ready to boost your confidence and ace your next interview!
                    </p>
                </main>
        </>
    );
};

export default About;
