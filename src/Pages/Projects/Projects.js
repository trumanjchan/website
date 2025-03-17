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


            const carouselArea = document.querySelector(".carousel-area");
            const slides = document.getElementsByClassName("carousel-slide");
            var backIndex;
            var index1;
            var index2;
            var frontIndex;

            if (window.innerWidth > 768) {
                /* Desktop - click and drag */
                backIndex = 0;
                index1 = 0;
                index2 = 1;
                frontIndex = 1;
                let startX = 0;

                const mouseDown = (e) => {
                    startX = e.clientX;
                }
                const mouseUp = (e) => {
                    const currentX = e.clientX;
                    if (currentX !== startX) {
                        if (currentX < startX) {
                            if (index1 === data.projectsPageCollection.items.length - 2) {
                                return;
                            }
                            if (index2 === data.projectsPageCollection.items.length - 1) {
                                return;
                            }
    
                            backIndex++;
                            index1++;
                            index2++;
                            frontIndex++;
    
                            slides[frontIndex].scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                                inline: 'end'
                            })
                        } else if (currentX > startX) {
                            if (index1 === 0) {
                                return;
                            }
                            if (index2 === 1) {
                                return;
                            }
    
                            backIndex--;
                            index1--;
                            index2--;
                            frontIndex--;
    
                            slides[backIndex].scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                                inline: 'start'
                            })
                        }
                    }
                }
                carouselArea.addEventListener("mousedown", mouseDown);
                carouselArea.addEventListener("mouseup", mouseUp);
            } else {
                /* Mobile - swipe */
                backIndex = 0;
                index1 = 0;
                frontIndex = 0;
                let touchStartX = 0;
                let touchEndX = 0;

                const touchStart = (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }
                const touchEnd = (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    const swipeDistance = touchEndX - touchStartX;

                    if (swipeDistance < 0) {
                        if (index1 === data.projectsPageCollection.items.length - 1) {
                            return;
                        }

                        backIndex++;
                        index1++;
                        frontIndex++;

                        slides[frontIndex].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'end'
                        })
                    } else if (swipeDistance > 0) {
                        if (index1 === 0) {
                            return;
                        }

                        backIndex--;
                        index1--;
                        frontIndex--;

                        slides[backIndex].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'start'
                        })
                    } else {
                        return;
                    }
                }
                carouselArea.addEventListener("touchstart", touchStart);
                carouselArea.addEventListener("touchend", touchEnd);
            }

            /* Desktop and Mobile */
            const slideNum = document.getElementsByClassName("gray-circle");
            for (let i = 0; i < slides.length; i++) {
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
                    threshold: 0
                });
                observer.observe(slides[i]);
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
