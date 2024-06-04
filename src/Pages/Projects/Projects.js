import React, {useState, useEffect} from 'react';
import './Projects.scss';
import Navbar from '../../Components/Navbar/Navbar';

const query = `
{
    projectsPageCollection {
        items {
            number,
            title,
            date,
            desc,
            stack: stack,
            link,
            image {
                fileName: title,
                url
            }
        }
    }
}
`

function Projects() {
    const [page, setPage] = useState(null);
    var carouselTranslatedTotal = 0;
    var duplicateDomElements;

    function countDuplicateDOMElements() {
        let slides =  document.getElementsByClassName("carousel-slide");
        duplicateDomElements = 0;

        for (let i = 0; i < slides.length ; i++) {
            if (slides[0].href === slides[i].href) {
                duplicateDomElements++;
            }
        }
    }

    useEffect(() => {
        window
            .fetch(`https://graphql.contentful.com/content/v1/spaces/` + process.env.REACT_APP_SPACE_ID + `/`, {
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

                console.log(data.projectsPageCollection.items.sort((a, b) => {
                    return  b.number - a.number
                }));

                // rerender the entire component with new data
                setPage(data.projectsPageCollection);

                let slides =  document.getElementsByClassName("carousel-slide")
                for (let i = 0; i < slides.length; i++) {
                    if (window.innerWidth > 768) {
                        slides[i].style.width = ((window.innerWidth - 60) / 2) + "px";
                    } else {
                        slides[i].style.width = (window.innerWidth - 40) + "px";
                    }
                }
            });
            
        var touchPos1;
        var touchPos2;
        /* Desktop */
        document.getElementsByClassName("container")[0].addEventListener('mousedown', (e) => {
            touchPos1 = e.screenX;
        });
        document.getElementsByClassName("container")[0].addEventListener('mouseup', (e) => {
            touchPos2 = e.screenX;
            if (touchPos1 < touchPos2) {
                document.getElementById("dec").click();
            } else if (touchPos1 > touchPos2) {
                document.getElementById("inc").click();
            }
        });
        /* Mobile */
        document.getElementsByClassName("container")[0].addEventListener('touchstart', (e) => {
            touchPos1 = e.changedTouches[0].screenX;
        });
        document.getElementsByClassName("container")[0].addEventListener('touchend', (e) => {
            touchPos2 = e.changedTouches[0].screenX;
            if (touchPos1 < touchPos2) {
                document.getElementById("dec").click();
            } else if (touchPos1 > touchPos2) {
                document.getElementById("inc").click();
            }
        });
    }, []);

    window.addEventListener('resize', function() {
        let slides =  document.getElementsByClassName("carousel-slide");
        for (let i = 0; i < slides.length; i++) {
            if (window.innerWidth > 768) {
                slides[i].style.width = ((window.innerWidth - 60) / 2) + "px";
            } else {
                slides[i].style.width = (window.innerWidth - 40) + "px";
            }
        }
    });

    const moveCarousel = (e) => {
        let translateXValue;
        let slideWidth = window.innerWidth - 20;
        let carouselEle = document.getElementById("carousel");
        let slides =  document.getElementsByClassName("carousel-slide");

        if (window.innerWidth > 768) {
            if (e.target.id === "inc") {
                translateXValue = -(slideWidth / 2);
            } else {
                translateXValue = (slideWidth / 2);
            }
        } else {
            if (e.target.id === "inc") {
                translateXValue = -(slideWidth);
            } else {
                translateXValue = (slideWidth);
            }
        }

        carouselTranslatedTotal+= parseFloat(translateXValue);
        console.log(carouselTranslatedTotal);

        let facadeSlide = false;
        if (window.innerWidth > 768) {
            countDuplicateDOMElements();
            console.log((-(((window.innerWidth / 2) - 10)) * (page.items.length - 2)));

            if (carouselTranslatedTotal === ((window.innerWidth / 2) - 10)) {
                let lastCarouselSlideNode = slides[page.items.length - 1];
                let tempNode = lastCarouselSlideNode.cloneNode(true);
                carouselEle.insertBefore(tempNode, carouselEle.firstChild);
                facadeSlide = true;
            } else if (carouselTranslatedTotal > ((window.innerWidth / 2) - 10)) {
                carouselTranslatedTotal = -(((window.innerWidth / 2) - 10) * (page.items.length - 1)) + ((window.innerWidth / 2) - 10);
                carouselEle.removeChild(carouselEle.firstChild);
            } else if (carouselTranslatedTotal === 0 && duplicateDomElements === 2) {  //if facade slide exists at the beginning of the DOM Node List and we increment the carousel, delete it
                carouselEle.removeChild(carouselEle.firstChild);
            } else if (carouselTranslatedTotal === -(((window.innerWidth / 2) - 10)) * (page.items.length - 1)) {
                let firstCarouselSlideNode = slides[0];
                let tempNode = firstCarouselSlideNode.cloneNode(true);
                carouselEle.appendChild(tempNode, carouselEle.firstChild);
            } else if (carouselTranslatedTotal < -(((window.innerWidth / 2) - 10)) * (page.items.length - 1)) {
                carouselEle.removeChild(carouselEle.lastChild);
                carouselTranslatedTotal = 0;
            } else if ((carouselTranslatedTotal === -(((window.innerWidth / 2) - 10)) * (page.items.length - 2)) && duplicateDomElements === 2) {  //if facade slide exists at the end of the DOM Node List and we decrement the carousel, delete it
                carouselEle.removeChild(carouselEle.lastChild);
            }
        } else {
            if (carouselTranslatedTotal > 0) {
                carouselTranslatedTotal = -(((slideWidth) * page.items.length) - slideWidth);
            } else if (carouselTranslatedTotal ===  -((slideWidth) * page.items.length)) {
                carouselTranslatedTotal = 0;
            }
        }

        if (!facadeSlide) {
            //carouselEle.style.transition = "all 0.20s";
            carouselEle.style.transform = `translateX(${carouselTranslatedTotal + "px"}`;
        }
    }

    if (!page) {
        return (
            <main className='Projects'>
                <Navbar />
                <div id='container' className='container'>
                    <div>Loading...</div>
                </div>
            </main>
        )
    } else {
        return (
            <main className='Projects'>
                <Navbar />
                <div className='container'>
                    <div className='carousel-area'>
                        <div className='control-buttons'>
                            <div id='dec' onClick={moveCarousel}>﹤</div>
                            <div id='inc' onClick={moveCarousel}>﹥</div>
                        </div>
                        <div id='carousel'>
                            {page.items.map((item, index) => (
                                <a key={index} className='carousel-slide' href={item.link} target='_blank' rel='noreferrer'>
                                    <div className='slide'>
                                        <div className='info'>
                                            <h4>{item.date}</h4>
                                            <h1>{item.title}</h1>
                                            <h2>{item.desc}</h2>
                                            <h3>{item.stack}</h3>
                                        </div>
                                        <div className='image'>
                                            <img src={item.image.url} className="screenshot" alt={item.image.fileName} width="853.33px" height="480px" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Projects;
