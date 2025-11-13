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
    const slides = document.getElementsByClassName("carousel-slide");

    const currentIndex = useRef(0);
    const scrollStart = useRef(0);
    const startX = useRef(0);
    const startY = useRef(0);
    const isPointerDown = useRef(false);
    const isVerticalScroll = useRef(false);
    const [progress, setProgress] = useState(0);

    const progressBarUpdate = useCallback(() => {
        const container = carouselRef.current;
        const slide = slides[0];
        const slideWidth = slide.offsetWidth;

        const visibleSlides = Math.floor(container.clientWidth / slideWidth);
        const maxIndex = slides.length - visibleSlides;

        currentIndex.current = Math.max(0, Math.min(currentIndex.current, maxIndex));

        const progressValue = Math.min((currentIndex.current + visibleSlides) / slides.length, 1);
        setProgress(progressValue);
    }, [slides]);

    const pointerDown = useCallback((e) => {
        startX.current = e.clientX;
        startY.current = e.clientY;

        scrollStart.current = carouselRef.current.scrollLeft;

        isPointerDown.current = true;
        isVerticalScroll.current = false;
    }, []);

    const pointerMove = useCallback((e) => {
        if (!isPointerDown.current) return;

        const dx = e.clientX - startX.current;
        const dy = e.clientY - startY.current;

        if (!isVerticalScroll.current && Math.abs(dy) > Math.abs(dx)) {
            isVerticalScroll.current = true;
            return;
        }

        if (isVerticalScroll.current) return;

        carouselRef.current.scrollLeft = scrollStart.current - dx;
    }, []);
    
    const pointerUp = useCallback((e) => {
        isPointerDown.current = false;
        isVerticalScroll.current = false;

        const currentX = e.clientX;
        if (currentX !== startX.current) {
            const container = carouselRef.current;
            const slide = slides[0];
            const slideWidth = slide.offsetWidth;

            const visibleSlides = Math.floor(container.clientWidth / slideWidth);
            const maxIndex = slides.length - visibleSlides;

            (currentX < startX.current) ? currentIndex.current++ : currentIndex.current--;
            currentIndex.current = Math.max(0, Math.min(currentIndex.current, maxIndex));

            container.scrollTo({
                left: slides[currentIndex.current].offsetLeft,
                behavior: 'smooth'
            });

            progressBarUpdate();
        }
    }, [slides, progressBarUpdate]);
    
    useEffect(() => {
        if (page == null) return;

        const carouselArea = carouselRef.current;

        carouselArea.addEventListener("pointerdown", pointerDown);
        carouselArea.addEventListener("pointermove", pointerMove);
        carouselArea.addEventListener("pointerup", pointerUp);

        progressBarUpdate();

        return () => {
            carouselArea.removeEventListener("pointerdown", pointerDown);
            carouselArea.removeEventListener("pointermove", pointerMove);
            carouselArea.removeEventListener("pointerup", pointerUp);
        }
    }, [page, progressBarUpdate, pointerDown, pointerMove, pointerUp]);

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
                                <div className='carousel-slide' key={index}>
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
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress * 100}%`}} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Projects;
