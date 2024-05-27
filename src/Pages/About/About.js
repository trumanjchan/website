import React from 'react';
import { NavLink } from 'react-router-dom';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import Cover from '../../Images/CHX_NewYork.webp';
import Headshot from '../../Images/Truman_NY.webp';
import LinkedIn from '../../Images/icons8-linkedin.svg';
import GitHub from '../../Images/icons8-github.svg';
import Instagram from '../../Images/icons8-instagram.svg';
import Gmail from '../../Images/icons8-gmail-logo.svg';

function About() {

    let lastKnownScrollPosition = 0;
    let sectionNavbarPosition = 0;
    let ticking = false;

    function animateEssentialInfo(scrollPos, sectionPos) {
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
        if (window.location.pathname === '' || window.location.pathname === '/') {
            lastKnownScrollPosition = window.scrollY;
            if (window.innerWidth > 768) {
                sectionNavbarPosition = (window.pageYOffset + document.getElementById('Profile').getBoundingClientRect().bottom) - (document.getElementById('Profile').getBoundingClientRect().bottom - document.getElementById('info-container').getBoundingClientRect().bottom) - 102;
            }
            else {
                sectionNavbarPosition = (window.pageYOffset + document.getElementById('Profile').getBoundingClientRect().bottom) - (document.getElementById('Profile').getBoundingClientRect().bottom - document.getElementById('info-container').getBoundingClientRect().bottom) - 61;
            }

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    animateEssentialInfo(lastKnownScrollPosition, sectionNavbarPosition);
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
                <img className='cover' src={Cover} alt='NYC Brooklyn Bridge' />
                <div id='info-container' className='info-container'>
                    <div className='first'>
                        <img className='headshot' src={Headshot} alt='Truman C.' />
                        <h1>Truman Chan</h1>
                        <h2>Junior Developer</h2>
                        <div className='currentlywork'>ConcentricLife</div>
                        <h3>San Francisco, CA, United States</h3>
                    </div>
                    <div className='second'>
                        <p>University of California, Merced graduate with a bachelor's degree in Computer Science and Engineering. I specialize in frontend web development!</p>
                        <div className='social-container'>
                            <a href='https://www.linkedin.com/in/trumanjfchan' target='_blank' rel='noreferrer'><img className='social' src={LinkedIn} alt='LinkedIn' /></a>
                            <a href='https://github.com/trumanjchan' target='_blank' rel='noreferrer'><img className='social' src={GitHub} alt='GitHub' /></a>
                            <a href='https://www.instagram.com/true.chan' target='_blank' rel='noreferrer'><img className='social' src={Instagram} alt='Instagram' /></a>
                            <NavLink to="/contact"><img className='social' src={Gmail} alt='Gmail' /></NavLink>
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

            <div className='Skills'>
                <div className='container'>
                    <div className='title'>Skills</div>
                    <div className='info'>
                        <div className='section-title'>Programming</div>
                        <div className='section-text'>HTML, CSS, JavaScript, React, AEM, Nuxt, Socket.io, C++, Python, SQL, REST APIs</div>
                        <div className='section-title'>Frameworks</div>
                        <div className='section-text'>React, Nuxt, Express, Flask</div>
                        <div className='section-title'>Tools</div>
                        <div className='section-text'>Git, VS Code, Sony Vegas Pro, Shotcut, Adobe Photoshop, Adobe XD, Google Workspace</div>
                        <div className='section-title'>Soft</div>
                        <div className='section-text'>Communication, Teamwork, Problem-solving, Motivated</div>
                        <div className='section-title'>Languages</div>
                        <div className='section-text'>English and conversational Cantonese</div>
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
                                <div className='companyname'><a id='poc-mini-game' href='https://concentric.life/' target='_blank' rel='noreferrer'>ConcentricLife</a></div>
                                <div className='date'>Full-time</div>
                                <div>New York City, NY</div>
                            </div>
                            <div className='jobdesc'>
                                <div className='lead'>
                                    <div className='pos'>
                                        <div className='position'>Junior Developer</div>
                                        <div className='date'>Aug 2022 - <i>Present</i></div>
                                    </div>
                                    <ul className='text'>
                                        <li>Cooperate regularly and closely with other members of the Development, QA, Design, Integrated Production, Editorial, and Copy teams on timed deliverables.</li>
                                        <li>Implement changes requested on Ziflow/Workfront routes for emails (MJML, OFTs, Email on Acid), banners (GSAP, DoubleClick), and websites (Nuxt.js, Vue.js, AEM, AWS) through code.</li>
                                        <li>Created two object oriented responsive mini game web apps using HTML, CSS, JavaScript, Socket.io, and Express.js under R&D.</li>
                                    </ul>
                                </div>
                                <div className='member'>
                                    <div className='pos'>
                                        <div className='position'>Developer Apprentice</div>
                                        <div className='date'>Jun 2022 - Aug 2022 &nbsp;|&nbsp;&nbsp;3&nbsp;mos</div>
                                    </div>
                                    <ul className='text'>
                                        <li>Collaborated in a brand team in Concentric Health Experience's 9-week internship to create a pitch presentation and present to a CHX client while onboarding with the development team.</li>
                                        <li>Learned how a healthcare advertising agency operates by attending informative CHX-led presentations.</li>
                                        <li>Acquired knowledge of MJML, GSAP, Veeva Systems, Wordpress, and Vue.js through LinkedIn Learning courses and reading documentation during onboarding with the development team.</li>
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
                                        <li>Learned and worked with HTML, CSS, JavaScript, Node.js, React.js, Github, and Gitkraken.</li>
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
