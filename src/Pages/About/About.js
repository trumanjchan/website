import React from 'react';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import Cover from '../../Images/UCM_Admin_Building.jpg';
import Headshot from '../../Images/Truman.jpg';
import Linkedin from '../../Images/linkedin.png';
import Github from '../../Images/github.png';
import Youtube from '../../Images/youtube.png';
import Gmail from '../../Images/gmail.png';

function About() {
    return (
        <main className='About'>
            <Navbar />
            <div className='grid-container'>
                <img className='cover' src={Cover} alt='UC Merced Admin Building' />
                <div className='info-container'>
                    <div className='column-grid'>
                        <div className='first'>
                            <img className='headshot' src={Headshot} alt='Truman C.' />
                            <h1>Truman Chan</h1>
                            <h2>Frontend Engineer</h2>
                            <h3>San Francisco, CA, United States</h3>
                        </div>
                        <div className='second'>
                            <p>I am a University of California, Merced graduate with a Computer Science and Engineering degree. I am interested in frontend web development!</p>
                            <div className='social-container'>
                                <a href='https://www.linkedin.com/in/trumanjfchan/' target='_blank' rel='noreferrer'><img className='social' src={Linkedin} alt='Linkedin' /></a>
                                <a href='https://github.com/trumanjchan' target='_blank' rel='noreferrer'><img className='social' src={Github} alt='Github' /></a>
                                <a href='https://www.youtube.com/channel/UCZb5w-4IBBowCrCCsKAtbuQ/featured' target='_blank' rel='noreferrer'><img className='social' src={Youtube} alt='Youtube' /></a>
                                <a href="mailto:trumanjfchan@gmail.com" target='_blank' rel='noreferrer'><img className='social' src={Gmail} alt='Gmail' /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default About;
