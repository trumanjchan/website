import React, { useEffect } from 'react';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import Cover from '../../Images/CHX_NewYork.webp';
import Headshot from '../../Images/Truman_NY.webp';
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

    let lastKnownScrollPosition = 0;
    let aboutProfileContainerPosition = 0;
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
        if (window.location.pathname === '/my-website' || window.location.pathname === '/my-website/') {
            lastKnownScrollPosition = window.scrollY;
            aboutProfileContainerPosition = document.getElementById('AboutProfile').scrollHeight;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    doSomething(lastKnownScrollPosition, aboutProfileContainerPosition);
                    ticking = false;
                });

                ticking = true;
            }
        }
    });

    return (
        <main className='About'>
            <Navbar />

            <div id='AboutProfile' className='Profile'>
                <img className='cover' src={Cover} alt='UC Merced Admin Building' />
                <div className='info-container'>
                    <div className='column-grid'>
                        <div className='first'>
                            <img className='headshot' src={Headshot} alt='Truman C.' />
                            <h1>Truman Chan</h1>
                            <h2>Junior Developer</h2>
                            <div className='currentlywork'>Concentric&nbsp;Health&nbsp;Experience</div>
                            <h3>San Francisco, CA, United States</h3>
                        </div>
                        <div className='second'>
                            <p>University of California, Merced graduate with a bachelor's degree in Computer Science and Engineering. I am interested in frontend web development!</p>
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
                                    <td>poc-mini-game<br/><a className='float-right-NDA' href='#poc-mini-game'>NDA</a></td>
                                    <td>
                                        <div>Aug.&nbsp;2022</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div><i>Present</i></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Socketchat<br/><i className='float-right'><a href='https://github.com/trumanjchan/Socketchat' target='_blank' rel='noreferrer'>Source</a> <a href='https://wschat.onrender.com/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>
                                        <div>Mar.&nbsp;2022</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Apr.&nbsp;2022</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>This Website!</b><br/><i className='float-right'><a href='https://github.com/trumanjchan/my-website' target='_blank' rel='noreferrer'>Source</a></i></td>
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
                                    <td>My Task Board<br/><i className='float-right'><a href='https://github.com/illumimarty/CSE111-Fall2021-Project' target='_blank' rel='noreferrer'>Source</a></i></td>
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
                                <tr>
                                    <td>Bootstrap Website<br/><i className='float-right'><a href='https://github.com/trumanjchan/trumanjchan.github.io' target='_blank' rel='noreferrer'>Source</a> <a href='https://trumanjchan.github.io/' target='_blank' rel='noreferrer'>Live</a></i></td>
                                    <td>
                                        <div>Sept.&nbsp;2018</div>
                                        <div>&nbsp;-&nbsp;</div>
                                        <div>Nov.&nbsp;2020</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="Skills" className="tabcontent">
                        <div className='info'>
                            <div className='title'>Programming</div>
                            <div className='text'>C++, Python, HTML, CSS, Javascript, Node.js, REST APIs, SQL</div>
                            <div className='title'>Frameworks</div>
                            <div className='text'>Bootstrap, React, Flask, Express.js</div>
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
                            <div className='for'><a href='https://devpost.com/software/insight-ar-glasses' target='_blank' rel='noreferrer'>DesignMerced I Winner</a></div>
                            <div className='issued'>Issued by DesignMerced I • Nov&nbsp;2020</div>
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
                                    <div className='text'>
                                        <div>• Created an object oriented responsive mini game web app using HTML, CSS, Javascript, Socket.io, Node.js, and Express.js under R&D.</div>
                                        <div>• Implement changes requested on Ziflow routes for emails, banners, and websites through code to pass back to IP (Integrated Production) for further markups or to QA for additional testing.</div>
                                    </div>
                                </div>
                                <div className='member'>
                                    <div className='pos'>
                                        <div className='position'>Developer Apprentice</div>
                                        <div className='date'>Jun 2022 - Aug 2022 • 3&nbsp;mos</div>
                                    </div>
                                    <div className='text'>
                                        <div>• Collaborated in a brand team in CHX's 9-week internship to create a pitch presentation and present to a CHX client.</div>
                                        <div>• Learned how a healthcare advertising agency operates by attending informative CHX-led presentations.</div>
                                        <div>• Acquired knowledge of MJML, GSAP, Veeva Systems, Wordpress, Bitbucket, and Jira through LinkedIn Learning courses and reading documentation during onboarding with the development team.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='divider'></div>

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
                                        <div className='date'>Apr 2021 - Dec 2021 • 9&nbsp;mos</div>
                                    </div>
                                    <div className='text'>
                                        <div>• Assigned tasks to frontend team members.</div>
                                        <div>• Taught team members how to work with the codebase by explaining how to use Gitkraken for tasks and Github for pull requests.</div>
                                    </div>
                                </div>
                                <div className='member'>
                                    <div className='pos'>
                                        <div className='position'>Frontend Member</div>
                                        <div className='date'>Sep 2019 - Apr 2021 • 1&nbsp;yr&nbsp;8&nbsp;mos</div>
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
            </div>
        </main>
    );
}

export default About;
