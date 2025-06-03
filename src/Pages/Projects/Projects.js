import {useState, useEffect, useCallback, useRef} from 'react';
import './Projects.css';
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
    const slides = document.getElementsByClassName("carousel-slide");
    var [backIndex, setBackIndex] = useState(null);
    var [index1, setIndex1] = useState(null);
    var [index2, setIndex2] = useState(null);
    var [frontIndex, setFrontIndex] = useState(null);
    const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let startX = useRef(0);
    let isMouseDown = useRef(false);
    let offsetX = useRef(0);
    let offsetTotal = useRef(0);
    const mouseDown = useCallback((e) => {
        startX.current = e.clientX;
        isMouseDown.current = true;
    }, [])
    const mouseMove = useCallback((e) => {
        if (isMouseDown.current) {
            offsetX.current = (e.clientX - startX.current);
            document.getElementById("carousel").style.left = `${offsetX.current + offsetTotal.current}px`;
        }
    }, [])
    const mouseUp = useCallback((e) => {
        isMouseDown.current = false;

        const currentX = e.clientX;
        if (currentX !== startX.current) {
            document.getElementById("carousel").style.left = offsetX.current;
            offsetTotal.current += offsetX.current;

            if (currentX < startX.current) {
                if (frontIndex === page.items.length - 1) {
                    console.log("DESKTOP-RIGHT-END");
                    slides[page.items.length - 1].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'end'
                    })
                    return;
                } else {
                    backIndex++;
                    index1++;
                    index2++;
                    frontIndex++;

                    slides[frontIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'end'
                    })
                }
            } else {
                if (backIndex === 0) {
                    console.log("DESKTOP-LEFT-END");
                    slides[0].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'start'
                    })
                    return;
                } else {
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
    }, [page, slides, backIndex, index1, index2, frontIndex])

    let touchStartX = useRef(0);
    let touchEndX = useRef(0);
    const touchStart = useCallback((e) => {
        touchStartX.current = e.changedTouches[0].screenX;
    }, [])
    const touchEnd = useCallback((e) => {
        touchEndX.current = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX.current - touchStartX.current;

        if (swipeDistance < -40) {
            if (frontIndex === page.items.length - 1) {
                console.log("MOBILE-RIGHT-END")
                return;
            } else {
                backIndex++;
                index1++;
                frontIndex++;

                slides[frontIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'end'
                })
            }
        } else if (swipeDistance > 40) {
            if (index1 === 0) {
                console.log("MOBILE-LEFT-END")
                return;
            } else {
                backIndex--;
                index1--;
                frontIndex--;

                slides[backIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'start'
                })
            }
        } else {
            return;
        }
    }, [page, slides, backIndex, index1, frontIndex])
    
    useEffect(() => {
        if (page == null) return;

        const carouselArea = document.querySelector(".carousel-area");

        // TO DO: resize eventlistener for the scrollIntoView's to subtract 1 from index value if window.innerWidth < 768

        /* Initial index settings. Not responsive to window resize */
        setBackIndex(0);
        setIndex1(0);
        if (window.innerWidth > 768) {
            setIndex2(1);
            setFrontIndex(1);
        } else {
            setIndex2(null);
            setFrontIndex(0);
        }

        if (!supportsTouch) {
            /* Desktop - click and drag */
            carouselArea.addEventListener("mousedown", mouseDown);
            carouselArea.addEventListener("mousemove", mouseMove);
            carouselArea.addEventListener("mouseup", mouseUp);
        } else {
            /* Mobile - swipe */
            carouselArea.addEventListener("touchstart", touchStart);
            carouselArea.addEventListener("touchend", touchEnd);
        }

        /* Desktop and Mobile */
        const observers = [];
        const slideNum = document.getElementsByClassName("slide-circle");
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
            observers.push(observer);
        }

        return () => {
            if (!supportsTouch) {
                carouselArea.removeEventListener("mousedown", mouseDown);
                carouselArea.removeEventListener("mousemove", mouseMove);
                carouselArea.removeEventListener("mouseup", mouseUp);
            } else {
                carouselArea.removeEventListener("touchstart", touchStart);
                carouselArea.removeEventListener("touchend", touchEnd);
            }

            observers.forEach(observer => observer.disconnect());
            observers.length = 0;
        }
    }, [page, slides, index1, supportsTouch, mouseDown, mouseMove, mouseUp, touchStart, touchEnd]);

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
                                        <div className='info-container'>
                                            <div className="fade top"></div>
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
                                                    <h3>{item.stack.map((tech, index) => (
                                                        <div key={index}>{tech}</div>
                                                    ))}</h3>
                                                </div>
                                            </div>
                                            <div className="fade bot"></div>
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
                            <div key={index} className='slide-circle'></div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }
}

export default Projects;
