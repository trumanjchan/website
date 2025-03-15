import React, {useState, useEffect} from 'react';
import './Projects.scss';
import Navbar from '../../Components/Navbar/Navbar';
import { formatDate } from '../../utils';

const query = `
{
    projectsPageCollection(order: [endDate_DESC]) {
        items {
            title,
            startDate,
            endDate,
            desc,
            stack: stack,
            link,
            image
        }
    }
}
`

function Projects() {
    const [page, setPage] = useState(null);

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

            // rerender the entire component with new data
            setPage(data.projectsPageCollection);
            console.log(data.projectsPageCollection);

            const slides = document.getElementsByClassName("carousel-slide");
            const slideNum = document.getElementsByClassName("gray-circle");
            for (let i = 0; i < slides.length; i++) {
                const target = document.getElementsByClassName('carousel-slide')[i];

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            slideNum[i].classList.add("visible");
                        } else {
                            slideNum[i].classList.remove("visible");
                        }
                    });
                }, {
                    root: null, // viewport
                    rootMargin: '0px', // no margin around the root
                    threshold: 0.5 // 50% of the element must be visible
                });
                console.log(target)
                observer.observe(target);
            }
        });
    }, []);

    if (!page) {
        return (
            <main className='Projects'>
                <Navbar />
            </main>
        )
    } else {
        return (
            <main className='Projects'>
                <Navbar />
                <div className='container'>
                    <div className='carousel-area'>
                        <div id='carousel'>
                            {page.items.map((item, index) => (
                                <div key={index} className='carousel-slide'>
                                    <div className='slide'>
                                        <div className='info'>
                                            {item.startDate !== item.endDate ? (
                                                <h4>{formatDate(item.startDate, false)} - {formatDate(item.endDate, false)}</h4>
                                            ) : (
                                                <h4>{formatDate(item.endDate, false)}</h4>
                                            )}
                                            <a href={item.link} target='_blank' rel='noreferrer'>
                                                <h1>{item.title}</h1>
                                            </a>
                                            <div className='flex-container'>
                                                <h2>{item.desc}</h2>
                                                <h3>{JSON.stringify(item.stack).replaceAll(/\[|\]|"/gi, "").replaceAll(",", " ")}</h3>
                                            </div>
                                        </div>
                                        <div className='image'>
                                            <img src={item.image[0].secure_url} className="screenshot" alt={item.image[0].public_id.slice(0, (item.image[0].public_id).indexOf("_"))} width="853.33px" height="480px" draggable="false" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='slides'>
                        {page.items.map((item, index) => (
                            <div key={index} className='gray-circle'></div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }
}

export default Projects;
