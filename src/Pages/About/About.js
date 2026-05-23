import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './About.css';
import Navbar from '../../Components/Navbar/Navbar';
import LinkedIn from '../../Images/linkedin.png';
import GitHub from '../../Images/github.svg';
import Instagram from '../../Images/instagram.svg';
import Gmail from '../../Images/gmail.svg';

const query = `
{
    aboutPageCollection(limit: 1) {
        items {
            profileCover,
            profileHeadshot,
            profileName,
            profileTitle,
            profileCompany,
            profileLocation,
            profileDesc,
            skills,

            experienceCollection {
                items {
                    name,
                    website,
                    status,
                    location,

                    positionsCollection {
                        items {
                            details
                        }
                    }
                }
            }
        }
    }
}
`

function About() {
    const [page, setPage] = useState(null);

    function toggleOpacity() {
        document.getElementById('mini-info-container').classList.toggle('t-opacity');
    }

    function scroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                observer.disconnect();
                if (!entry.isIntersecting) {
                    document.getElementById('mini-info-container').classList.remove('sectionfadeout');
                    document.getElementById('mini-info-container').classList.add('sectionfadein');
                }
                if (entry.isIntersecting && document.getElementById('mini-info-container').classList.contains('sectionfadein')) {
                    document.getElementById('mini-info-container').classList.remove('sectionfadein');
                    document.getElementById('mini-info-container').classList.add('sectionfadeout');
                }
            });
        }, {'rootMargin': '-102px 0px 0px 0px'});
        if (document.getElementById("Profile")) {
            observer.observe(document.getElementById("Profile"));
        }
    }

    useEffect(() => {
        window.fetch(`https://graphql.contentful.com/content/v1/spaces/` + process.env.REACT_APP_SPACE_ID + `/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authenticate the request
                Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
            },
            // send the GraphQL query
            body: JSON.stringify({ query }),
        })
        .then((response) => response.json())
        .then(({ data, errors }) => {
            if (errors) {
                console.error(errors);
            }

            setPage(data.aboutPageCollection);

            let element = document.getElementById("mini-info-container");
            let newParent = document.getElementById("nav");
            newParent.appendChild(element);
            document.getElementById("dropdown").addEventListener("click", toggleOpacity);
        });

        document.addEventListener("scroll", scroll);
        return () => {
            document.getElementById("dropdown").removeEventListener('click', toggleOpacity);
            document.removeEventListener("scroll", scroll);
        };
    }, []);

    if (!page) {
        return (
            <main className='About'>
                <Navbar />
            </main>
        )
    } else {
        return (
            <main className='About'>
                <Navbar />

                {page.items.map((item, index) => (
                    <div key={index}>
                        <div id='mini-info-container'>
                            <div className='mini-info'>
                                <img className='headshot' src={item.profileHeadshot[0].secure_url} alt={item.profileHeadshot[0].public_id.slice(0, (item.profileHeadshot[0].public_id).indexOf("_"))} width='34px' height='32px' />
                                <div id='textcontainer'>
                                    <div>{item.profileName}</div>
                                    <div>{item.profileTitle} at&nbsp;{item.profileCompany.company}</div>
                                </div>
                            </div>
                        </div>

                        <div id='Profile' className='Profile card'>
                            <img className='cover' src={item.profileCover[0].secure_url} alt={item.profileCover[0].public_id.slice(0, (item.profileCover[0].public_id).indexOf("_"))} width='1000px' height='200px' />
                            <div className='content'>
                                <div className='first'>
                                    <img className='headshot' src={item.profileHeadshot[0].secure_url} alt={item.profileHeadshot[0].public_id.slice(0, (item.profileHeadshot[0].public_id).indexOf("_"))} width='200px' height='187px' />
                                    <h1>{item.profileName}</h1>
                                    <h2>{item.profileTitle}</h2>
                                    <div className='company'>
                                        {item.profileCompany.company}
                                        <br/>
                                        <span className='parentcompany'>{item.profileCompany.parentcompany}</span>
                                    </div>
                                    <h3>{item.profileLocation}</h3>
                                </div>
                                <div className='second'>
                                    <p>{item.profileDesc}</p>
                                    <div className='social-container'>
                                        <a href='https://www.linkedin.com/in/trumanjfchan' target='_blank' rel='noreferrer'><img className='social' src={LinkedIn} alt='LinkedIn' /></a>
                                        <a href='https://github.com/trumanjchan' target='_blank' rel='noreferrer'><img className='social' src={GitHub} alt='GitHub' /></a>
                                        <a href='https://www.instagram.com/true.chan' target='_blank' rel='noreferrer'><img className='social' src={Instagram} alt='Instagram' /></a>
                                        <NavLink to="/contact"><img className='social' src={Gmail} alt='Gmail' /></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Education card'>
                            <div className='container'>
                                <div className='title'>Education</div>
                                <div className='content'>
                                    <div className='school'>
                                        <div className='schoolname'>University of California, Merced</div>
                                        <div className='degree'>Bachelor of Science - Computer Science and Engineering</div>
                                        <div className='year'>Jan 2018 - Dec 2021</div>
                                        <div className='activitiestitle'>Student Organization:
                                            <div className='activities'><a href='https://github.com/HackMerced/HackMerced/commits?author=trumanjchan' target='_blank' rel='noreferrer'>HackMerced</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Skills card'>
                            <div className='container'>
                                <div className='title'>Skills</div>
                                <div className='content'>
                                    {Object.keys(item.skills).map((key, index) => (
                                        <div key={index} className="section">
                                            <div className='section-title'>{key}</div>
                                            <div className='section-text'>
                                                {item.skills[key].map((ele, index) => (
                                                    <div key={index} className='pill'>{ele}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='Experience card'>
                            <div className='container'>
                                <div className='title'>Experience</div>
                                <div className='content'>
                                    {Object.values(item.experienceCollection.items).reverse().map((company, index) => (
                                        <div key={index} className='worked-at'>
                                            <div className='company'>
                                                <div className='company-name'><a href={company.website} target='_blank' rel='noreferrer'>{company.name}</a></div>
                                                <div className='company-date'>{company.status}</div>
                                                <div>{company.location}</div>
                                            </div>
                                            <div className='job'>
                                                <div className='job-desc'>
                                                    {[...company.positionsCollection.items].reverse().map((position, index) => (
                                                        <div key={index}>
                                                            <div className='position'>
                                                                <div className='position-title'>{position.details.Title}</div>
                                                                <div className='position-date'>{position.details.Status}</div>
                                                            </div>
                                                            <ul className='responsibilities'>
                                                                {position.details.Responsibilities.map((bullet, index) => (
                                                                    <li key={index}>{bullet}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        );
    }
}

export default About;
