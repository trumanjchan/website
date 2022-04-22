import React, { useEffect } from 'react';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import Cover from '../../Images/UCM_Admin_Building.webp';
import Headshot from '../../Images/Truman.webp';
import Linkedin from '../../Images/linkedin.webp';
import Github from '../../Images/github.webp';
import Youtube from '../../Images/youtube.webp';
import Gmail from '../../Images/email.webp';

function About() {

    useEffect(() => {
        document.getElementById("defaultOpen").click();
    },[]);

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
                            <h2>Frontend Developer</h2>
                            <h3>San Francisco, CA, United States</h3>
                        </div>
                        <div className='second'>
                            <p>I am a University of California, Merced graduate with a bachelor's degree in Computer Science and Engineering. I am interested in frontend web development!</p>
                            <div className='social-container'>
                                <a href='https://www.linkedin.com/in/trumanjfchan' target='_blank' rel='noreferrer'><img className='social' src={Linkedin} alt='Linkedin icon by mohammed mahdi on flaticon.com' /></a>
                                <a href='https://github.com/trumanjchan' target='_blank' rel='noreferrer'><img className='social' src={Github} alt='Github icon by riajulislam on flaticon.com' /></a>
                                <a href='https://www.youtube.com/channel/UCZb5w-4IBBowCrCCsKAtbuQ/featured' target='_blank' rel='noreferrer'><img className='social' src={Youtube} alt='Youtube icon by Md Tanvirul Haque on flaticon.com' /></a>
                                <a href='mailto:trumanjfchan@gmail.com' target='_blank' rel='noreferrer'><img className='social' src={Gmail} alt='Gmail icon by rukanicon on flaticon.com' /></a>
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
                        <table>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Socketchat <i className='float-right'><a href='https://github.com/trumanjchan/Socketchat' target='_blank' rel='noreferrer'>Source</a> <a href='https://sockchats.herokuapp.com/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>Mar. 2022 - <i>Present</i></td>
                                </tr>
                                <tr>
                                    <td><b>This Website!</b> <i className='float-right'><a href='https://github.com/trumanjchan/my-website' target='_blank' rel='noreferrer'>Source</a></i></td>
                                    <td>Dec. 2021 - Feb. 2022</td>
                                </tr>
                                <tr>
                                    <td>Scribing <i className='float-right'><a href='https://github.com/shiv248/TypeRacer' target='_blank' rel='noreferrer'>Source</a> <a href='https://scribing.herokuapp.com/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>Nov. 2021 - Dec. 2021</td>
                                </tr>
                                <tr>
                                    <td>My Task Board <i className='float-right'><a href='https://github.com/illumimarty/CSE111-Fall2021-Project' target='_blank' rel='noreferrer'>Source</a></i></td>
                                    <td>Nov. 2021 - Dec. 2021</td>
                                </tr>
                                <tr>
                                    <td>OOP Mini Game <i className='float-right'><a href='https://github.com/trumanjchan/CSE165_Labs' target='_blank' rel='noreferrer'>Source</a></i></td>
                                    <td>Nov. 2020 - Dec. 2020</td>
                                </tr>
                                <tr>
                                    <td>inSight Prototype <i className='float-right'><a href='https://devpost.com/software/insight-ar-glasses' target='_blank' rel='noreferrer'>Devpost</a> <a href='https://xd.adobe.com/view/fbc45307-37f5-4384-8550-0e9fd84fc124-ae97/?fullscreen' target='_blank' rel='noreferrer'>Demo</a></i></td>
                                    <td>Nov. 2020</td>
                                </tr>
                                <tr>
                                    <td>Bootstrap Website <i className='float-right'><a href='https://github.com/trumanjchan/trumanjchan.github.io' target='_blank' rel='noreferrer'>Source</a> <a href='https://trumanjchan.github.io/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>Sept. 2018 - Nov. 2020</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="Skills" className="tabcontent">
                        <div className='info'>
                            <div className='title'>Programming</div>
                            <div className='text'>C++, Python, HTML, CSS, Javascript, REST APIs, SQL</div>
                            <div className='title'>Frameworks</div>
                            <div className='text'>Bootstrap, React, Flask, Express</div>
                            <div className='title'>Tools</div>
                            <div className='text'>Visual Studio Code, Git, Github, Gitkraken, Sony Vegas Pro, Adobe CS5, Adobe XD, Google Workspace</div>
                            <div className='title'>Languages</div>
                            <div className='text'>English and conversational Cantonese</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Awards'>
                <div className='container'>
                    <div className='title'>Awards</div>
                    <div className='designmerced'>
                        <div className='award'>
                            <div className='for'><a href='https://devpost.com/software/insight-ar-glasses' target='_blank' rel='noreferrer'>DesignMerced Winner</a></div>
                            <div className='issued'>Issued by DesignMerced I • Nov 2020</div>
                        </div>
                        <div className='awarddesc'>
                            <div>• Competed in a remote 24-hour design hackathon and won third place.</div>
                            <div>• Designed Adobe XD prototype of a pair of AR glasses that can connect to the internet and help users network with people on-the-go.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Experience'>
                <div className='container'>
                    <div className='title'>Experience</div>
                    <div className='hackmerced'>
                        <div className='total'>
                            <div className='companyname'><a href='https://github.com/HackMerced/HackMerced/commits?author=trumanjchan' target='_blank' rel='noreferrer'>HackMerced</a></div>
                            <div className='date'>2 yrs 4 mos</div>
                            <div>University of California, Merced</div>
                        </div>
                        <div className='jobdesc'>
                            <div className='lead'>
                                <div className='pos'>
                                    <div className='position'>Frontend Lead</div>
                                    <div className='date'>Apr 2021 - Dec 2021 • 9 mos</div>
                                </div>
                                <div className='text'>
                                    <div>• Assigned tasks to frontend team members.</div>
                                    <div>• Taught team members how to work with the codebase by explaining how to use Gitkraken for tasks and Github for pull requests.</div>
                                </div>
                            </div>
                            <div className='member'>
                                <div className='pos'>
                                    <div className='position'>Frontend Member</div>
                                    <div className='date'>Sep 2019 - Apr 2021 • 1 yr 8 mos</div>
                                </div>
                                <div className='text'>
                                    <div>• Learned and worked with HTML, CSS, Javascript, Node.js, React.js, Github, and Gitkraken.</div>
                                    <div>• Coded responsive and reusable web page components and web pages for in-person and virtual events, and for the HackMerced website.</div>
                                    <div>• Organized two MLH Local Build/Hack Day events, two 36-hour hackathons, and a design hackathon with teammates.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default About;
