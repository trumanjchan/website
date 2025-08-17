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
    const carouselRef = useRef(null);
    const slideRefs = useRef([]);
    
    const currentArray = useRef([]);
    var scrollStart = useRef(0);
    var startX = useRef(0);
    const isPointerDown = useRef(false);
    var offsetX = useRef(0);
    var offsetTotal = useRef(0);

    const pointerDown = useCallback((e) => {
        startX.current = e.clientX;
        scrollStart.current = carouselRef.current.scrollLeft;

        isPointerDown.current = true;
    }, []);

    const pointerMove = useCallback((e) => {
        if (isPointerDown.current) {
            offsetX.current = (e.clientX - startX.current);
            carouselRef.current.scrollLeft = scrollStart.current - offsetX.current;
        }
    }, []);
    
    const pointerUp = useCallback((e) => {
        isPointerDown.current = false;

        const currentX = e.clientX;
        if (currentX !== startX.current) {
            offsetTotal.current += offsetX.current;

            //If more than 30, else snap to previous index. If less than -30, else snap to previous index.

            if (currentX < startX.current) {
                if (slideRefs.current[Math.max(...currentArray.current)]) {
                    slideRefs.current[Math.max(...currentArray.current)].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'end'
                    });
                }
            } else {
                if (slideRefs.current[Math.min(...currentArray.current)]) {
                    slideRefs.current[Math.min(...currentArray.current)].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'start'
                    });
                }
            }
        }
    }, []);
    
    useEffect(() => {
        if (page == null) return;

        const carouselArea = carouselRef.current;
        const slides = slideRefs.current;
        const currentIndexes = currentArray.current;

        carouselArea.addEventListener("pointerdown", pointerDown);
        carouselArea.addEventListener("pointermove", pointerMove);
        carouselArea.addEventListener("pointerup", pointerUp);

        const observer = new IntersectionObserver(entries => {
            currentIndexes.length = 0;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentIndexes.push(slides.indexOf(entry.target));
                }
            });
        });

        slides.forEach(slide => {
            observer.observe(slide);
        });

        return () => {
            carouselArea.removeEventListener("pointerdown", pointerDown);
            carouselArea.removeEventListener("pointermove", pointerMove);
            carouselArea.removeEventListener("pointerup", pointerUp);

            slides.forEach(slide => {
                observer.unobserve(slide);
            });
        }
    }, [page, pointerDown, pointerMove, pointerUp]);

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
                    <div className='carousel-area' ref={carouselRef}>
                        <div id='carousel'>
                            {page.items.sort((a, b) => {
                                const endDiff = new Date(b.endDate) - new Date(a.endDate);
                                if (endDiff !== 0) return endDiff;
                                return new Date(b.startDate) - new Date(a.startDate);
                            }).map((item, index) => (
                                <div key={index} className='carousel-slide' ref={el => slideRefs.current[index] = el}>
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
                </div>
            </main>
        );
    }
}

export default Projects;
