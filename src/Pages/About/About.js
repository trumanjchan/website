import React, { useEffect } from 'react';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import Cover from '../../Images/CHX_NewYork.webp';
import Headshot from '../../Images/Truman_NY.webp';
import LinkedIn from '../../Images/icons8-linkedin.svg';
import GitHub from '../../Images/icons8-github.svg';
import Instagram from '../../Images/icons8-instagram.svg';
import Gmail from '../../Images/icons8-gmail-logo.svg';

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
    function moveToAnchor(evt, elementname) {
        let anchorPosition = 0;
        if (window.innerWidth > 640) {
            anchorPosition = (window.pageYOffset + document.getElementById(elementname).getBoundingClientRect().top) - 102;
        }
        else {
            anchorPosition = (window.pageYOffset + document.getElementById(elementname).getBoundingClientRect().top) - 61;
        }
        window.scrollTo(0, anchorPosition);
    }

    let lastKnownScrollPosition = 0;
    let sectionNavbarPosition = 0;
    let ticking = false;

    function doSomething(scrollPos, sectionPos) {
        if (scrollPos > sectionPos) {
            document.getElementById('essentialinfo').classList.remove('sectionfadeout');
            document.getElementById('essentialinfo').classList.add('sectionfadein');

            document.getElementById('textcontainer').classList.remove('textcontainerfadeout');
            document.getElementById('textcontainer').classList.add('textcontainerfadein');
        }
        else if (document.getElementById('essentialinfo').classList.contains('sectionfadein')) {
            document.getElementById('essentialinfo').classList.remove('sectionfadein');
            document.getElementById('essentialinfo').classList.add('sectionfadeout');

            document.getElementById('textcontainer').classList.remove('textcontainerfadein');
            document.getElementById('textcontainer').classList.add('textcontainerfadeout');
        }
    }

    document.addEventListener('scroll', (e) => {
        // Only check when on About page
        if (window.location.pathname === '/website' || window.location.pathname === '/website/') {
            lastKnownScrollPosition = window.scrollY;
            if (window.innerWidth > 640) {
                sectionNavbarPosition = (window.pageYOffset + document.getElementById('Profile').getBoundingClientRect().bottom) - (document.getElementById('Profile').getBoundingClientRect().bottom - document.getElementById('info-container').getBoundingClientRect().bottom) - 102;
            }
            else {
                sectionNavbarPosition = (window.pageYOffset + document.getElementById('Profile').getBoundingClientRect().bottom) - (document.getElementById('Profile').getBoundingClientRect().bottom - document.getElementById('info-container').getBoundingClientRect().bottom) - 61;
            }

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    doSomething(lastKnownScrollPosition, sectionNavbarPosition);
                    ticking = false;
                });

                ticking = true;
            }
        }
    });

    return (
        <main className='About'>
            <Navbar />

            <div id='Profile' className='Profile'>
                <img className='cover' src={Cover} alt='UC Merced Admin Building' />
                <div id='info-container' className='info-container'>
                    <div className='column-grid'>
                        <div className='first'>
                            <img className='headshot' src={Headshot} alt='Truman C.' />
                            <h1>Truman Chan</h1>
                            <h2>Junior Developer</h2>
                            <div className='currentlywork'>Concentric Health Experience</div>
                            <h3>San Francisco, CA, United States</h3>
                        </div>
                        <div className='second'>
                            <p>University of California, Merced graduate with a bachelor's degree in Computer Science and Engineering. I am interested in frontend web development!</p>
                            <div className='social-container'>
                                <a href='https://www.linkedin.com/in/trumanjfchan' target='_blank' rel='noreferrer'><img className='social' src={LinkedIn} alt='LinkedIn' /></a>
                                <a href='https://github.com/trumanjchan' target='_blank' rel='noreferrer'><img className='social' src={GitHub} alt='GitHub' /></a>
                                <a href='https://www.instagram.com/true.chan' target='_blank' rel='noreferrer'><img className='social' src={Instagram} alt='Instagram' /></a>
                                <a href='mailto:trumanjfchan@gmail.com' target='_blank' rel='noreferrer'><img className='social' src={Gmail} alt='Gmail' /></a>
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
                        <div className='activitiestitle'>Activities and societies:
                            <div className='activities'><a href='https://github.com/HackMerced/HackMerced/commits?author=trumanjchan' target='_blank' rel='noreferrer'>HackMerced</a>, Martial Arts Club</div>
                        </div>
                    </div>
                    <div className='school'>
                        <div className='schoolname'>George Washington High School</div>
                        <div className='degree'>High School Diploma</div>
                        <div className='year'>2013 - 2017</div>
                        <div className='activitiestitle'>Activities and societies:
                            <div className='activities'>Track and Field, Cross Country, Volunteer of Heart in Motion, YMCA Bike Club</div>
                        </div>
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
                                    <th>Projects</th>
                                    <th>Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>poc-mini-game<br/><button className='float-right-NDA' onClick={event => moveToAnchor(event, 'poc-mini-game')}>NDA</button></td>
                                    <td>
                                        <div>Aug.&nbsp;2022</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div><i>Present</i></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Socketchat<br/><i className='float-right'><a href='https://github.com/trumanjchan/Socketchat' target='_blank' rel='noreferrer'>Source</a> <a href='https://sockchats.fly.dev/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>
                                        <div>Mar.&nbsp;2022</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Apr.&nbsp;2022</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>This Website!</b><br/><i className='float-right'><a href='https://github.com/trumanjchan/website' target='_blank' rel='noreferrer'>Source</a></i></td>
                                    <td>
                                        <div>Dec.&nbsp;2021</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Feb.&nbsp;2022</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Scribing<br/><i className='float-right'><a href='https://github.com/shiv248/TypeRacer' target='_blank' rel='noreferrer'>Source</a></i></td>
                                    <td>
                                        <div>Nov.&nbsp;2021</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Dec.&nbsp;2021</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>My Task Board<br/><i className='float-right'><a href='https://github.com/illumimarty/CSE111-Fall2021-Project' target='_blank' rel='noreferrer'>Source</a> <a href='https://mytaskboard.fly.dev/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>
                                        <div>Nov.&nbsp;2021</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Dec.&nbsp;2021</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>OOP Mini Game<br/><i className='float-right'><a href='https://github.com/trumanjchan/CSE165_Labs' target='_blank' rel='noreferrer'>Source</a></i></td>
                                    <td>
                                        <div>Nov.&nbsp;2020</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Dec.&nbsp;2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>inSight Prototype<br/><i className='float-right'><a href='https://devpost.com/software/insight-ar-glasses' target='_blank' rel='noreferrer'>Devpost</a> <a href='https://xd.adobe.com/view/fbc45307-37f5-4384-8550-0e9fd84fc124-ae97/?fullscreen' target='_blank' rel='noreferrer'>Demo</a></i></td>
                                    <td>
                                        <div></div>
                                        <div>Nov.&nbsp;2020</div>
                                        <div></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="Skills" className="tabcontent">
                        <div className='info'>
                            <div className='title'>Programming</div>
                            <div className='text'>HTML, CSS, Javascript, Node.js, C++, Python, REST APIs, SQL</div>
                            <div className='title'>Frameworks</div>
                            <div className='text'>React.js, Express.js, Flask, Bootstrap</div>
                            <div className='title'>Tools</div>
                            <div className='text'>Git, Github, Gitkraken, Visual Studio Code, Sony Vegas Pro, Shotcut, Adobe Photoshop, Adobe XD, Google Workspace</div>
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
                            <div className='for'><a href='https://devpost.com/software/insight-ar-glasses' target='_blank' rel='noreferrer'>DesignMerced I</a></div>
                            <div className='issued'>Issued by DesignMerced I &nbsp;|&nbsp;&nbsp;Nov&nbsp;2020</div>
                        </div>
                        <ul className='awarddesc'>
                            <li>Competed in a remote 24-hour design hackathon and won third place.</li>
                            <li>Designed Adobe XD prototype of a pair of AR glasses that can connect to the internet and help users network with people on-the-go.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='Experience'>
                <div className='container'>
                    <div className='title'>Experience</div>
                    <div className='experiencelist'>
                        <div className='workedat'>
                            <div className='total'>
                                <div className='companyname'><a id='poc-mini-game' href='https://concentrichx.com/' target='_blank' rel='noreferrer'>Concentric Health Experience</a></div>
                                <div className='date'>Full-time</div>
                                <div>New York, NY</div>
                            </div>
                            <div className='jobdesc'>
                                <div className='lead'>
                                    <div className='pos'>
                                        <div className='position'>Junior Developer</div>
                                        <div className='date'>Aug 2022 - <i>Present</i></div>
                                    </div>
                                    <ul className='text'>
                                        <li>Created an object oriented responsive mini game web app using HTML, CSS, Javascript, Socket.io, Node.js, and Express.js under R&D.</li>
                                        <li>Implement changes requested on Ziflow routes for emails, banners, and websites through code to pass back to IP (Integrated Production) for further markups or to QA (Quality Assurance) for additional testing.</li>
                                    </ul>
                                </div>
                                <div className='member'>
                                    <div className='pos'>
                                        <div className='position'>Developer Apprentice</div>
                                        <div className='date'>Jun 2022 - Aug 2022 &nbsp;|&nbsp;&nbsp;3&nbsp;mos</div>
                                    </div>
                                    <ul className='text'>
                                        <li>Collaborated in a brand team in CHX's 9-week internship to create a pitch presentation and present to a CHX client.</li>
                                        <li>Learned how a healthcare advertising agency operates by attending informative CHX-led presentations.</li>
                                        <li>Acquired knowledge of MJML, GSAP, Veeva Systems, Wordpress, Bitbucket, and Jira through LinkedIn Learning courses and reading documentation during onboarding with the development team.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='workedat'>
                            <div className='total'>
                                <div className='companyname'><a href='https://hackmerced.com/' target='_blank' rel='noreferrer'>HackMerced</a></div>
                                <div className='date'>2 yrs 4 mos</div>
                                <div>University of California, Merced</div>
                            </div>
                            <div className='jobdesc'>
                                <div className='lead'>
                                    <div className='pos'>
                                        <div className='position'>Frontend Lead</div>
                                        <div className='date'>Apr 2021 - Dec 2021 &nbsp;|&nbsp;&nbsp;9&nbsp;mos</div>
                                    </div>
                                    <ul className='text'>
                                        <li>Assigned tasks to frontend team members.</li>
                                        <li>Taught team members how to work with the codebase by explaining how to use Gitkraken for tasks and Github for pull requests.</li>
                                    </ul>
                                </div>
                                <div className='member'>
                                    <div className='pos'>
                                        <div className='position'>Frontend Member</div>
                                        <div className='date'>Sep 2019 - Apr 2021 &nbsp;|&nbsp;&nbsp;1&nbsp;yr&nbsp;8&nbsp;mos</div>
                                    </div>
                                    <ul className='text'>
                                        <li>Learned and worked with HTML, CSS, Javascript, Node.js, React.js, Github, and Gitkraken.</li>
                                        <li>Coded responsive and reusable web page components and web pages for in-person and virtual events, and for the HackMerced website.</li>
                                        <li>Organized two MLH Local Build/Hack Day events, two 36-hour hackathons, and a design hackathon with teammates.</li>
                                    </ul>
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
