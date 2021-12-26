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
    window.onpageshow = function defaultTab() {
        document.getElementById("defaultOpen").click();
    }

    function openTab(evt, tabName) {
        document.getElementById("title").innerHTML = tabName;

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    return (
        <main className='About'>
            <Navbar />

            <div className='Profile'>
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

            <div className='Education'>
                <div className='container'>
                    <div className='title'>Education</div>
                    <div className='school'>
                        <div className='schoolname'>University of California, Merced</div>
                        <div className='degree'>Bachelor of Science - Computer Science and Engineering</div>
                        <div className='year'>2018 - 2021</div>
                        <div className='activities'>Activities:<br/>HackMerced club, Martial Arts club</div>
                    </div>
                    <div className='school'>
                        <div className='schoolname'>George Washington High School</div>
                        <div className='degree'>High School Diploma</div>
                        <div className='year'>2013 - 2017</div>
                        <div className='activities'>Activities:<br/>Track and Field, Cross Country, Volunteer of Heart in Motion, Bike club</div>
                    </div>
                </div>
            </div>

            <div className='Tabs'>
                <div className='container'>
                    <div className="tab">
                        <div id='title'></div>
                        <button className="tablinks" onClick={event => openTab(event, 'Skills')} id='defaultOpen'>Skills</button>
                        <button className="tablinks" onClick={event => openTab(event, 'Projects')}>Projects</button>
                    </div>

                    <div id="Projects" className="tabcontent">
                        <ol className='orderedlist'>
                            <li><a href='https://github.com/trumanjchan/my-website' target='_blank' rel='noreferrer'>This website!</a></li>
                            <li>School Projects
                                <ol>
                                    <li><a href='https://scribing.herokuapp.com/' target='_blank' rel='noreferrer'>Scribing - Typing Test</a></li>
                                    <li><a href='https://github.com/illumimarty/CSE111-Fall2021-Project' target='_blank' rel='noreferrer'>My Task Board</a></li>
                                    <li><a href='https://github.com/trumanjchan/CSE165_Labs' target='_blank' rel='noreferrer'>OOP mini game Final Project (solo)</a></li>
                                </ol>
                            </li>
                            <li>Devpost (hackathons)
                                <ol>
                                    <li><a href='https://devpost.com/software/insight-ar-glasses' target='_blank' rel='noreferrer'>inSight AR Glasses</a></li>
                                    <li><a href='https://devpost.com/software/mini-arena' target='_blank' rel='noreferrer'>mini-arena</a></li>
                                </ol>
                            </li>
                            <li><a href='https://trumanjchan.github.io/' target='_blank' rel='noreferrer'>My first website using Bootstrap!</a></li>
                        </ol>
                    </div>

                    <div id="Skills" className="tabcontent">
                        <div className='info'>
                            <div className='title'>Programming</div>
                            <div className='text'>Java, C++, Python, HTML, CSS, JavaScript</div>
                            <div className='title'>Frameworks</div>
                            <div className='text'>React, Flask</div>
                            <div className='title'>Tools</div>
                            <div className='text'>Visual Studio Code, Github, Gitkraken, Sony Vegas Pro, Adobe CS5, Adobe XD, Google Workspace</div>
                            <div className='title'>Languages</div>
                            <div className='text'>English and conversational Cantonese</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default About;
