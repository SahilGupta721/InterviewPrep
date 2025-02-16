import home_video from '../videos/interview.mp4';
import '../css/Home.css';
import { NavLink } from 'react-router-dom'
import "@fontsource/roboto";

function Home(){
    return(

    <>
    
            <div id="video_container">
                <video src={home_video} autoPlay loop muted>
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
            <div id="home_intro"><div>Welcome to InterviewPrep</div>
            </div>
            <div className='getstarted_btn'>
                <div id="button_container">
                <div className='actual_btn'><NavLink to='/JobDescription'>Get Started</NavLink></div>
                </div>
                
            </div>
    </>
    )
}
export default Home;
