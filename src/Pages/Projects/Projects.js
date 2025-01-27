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
            image
        }
    }
}
`

function Projects() {
    const [page, setPage] = useState(null);
    var slides = document.getElementsByClassName("carousel-slide");
    var firstIndex = 0;
    var secondIndex = 1;
    var swappedNodePos = false;

    const IteratePageArray = (e) => {
        let carouselEle = document.getElementById("carousel");
        let slideNum = document.getElementById("slide-num");

        slideNum.children[firstIndex].style.backgroundColor = "darkgray";
        slideNum.children[secondIndex].style.backgroundColor = "darkgray";

        if (e === "inc") {
            firstIndex++;
            secondIndex++;

            if (slides[firstIndex] == null) {
                firstIndex = 0;
            }
            if (slides[secondIndex] == null) {
                secondIndex = 0;
            }
        } else {
            firstIndex--;
            secondIndex--;

            if (slides[firstIndex] == null) {
                firstIndex = page.items.length - 1;
            }
            if (slides[secondIndex] == null) {
                secondIndex = page.items.length - 1;
            }
        }

        if (swappedNodePos) {
            let lastNode = slides[page.items.length - 1];
            carouselEle.insertBefore(lastNode, carouselEle.firstChild);
            swappedNodePos = false;
            console.log("swap back");
        }

        for (let i = 0; i < page.items.length; i++) {
            if (slides[i] === slides[firstIndex] || slides[i] === slides[secondIndex]) {
                slides[i].style.display = "block";
            } else {
                slides[i].style.display = "none";
            }
        }

        console.log(firstIndex + " " + secondIndex);
        
        if (!swappedNodePos && firstIndex === (page.items.length - 1) && secondIndex === 0) {
            let firstNode = slides[0];
            carouselEle.appendChild(firstNode);
            swappedNodePos = true;
            console.log("swap front");
        }

        
        if (window.innerWidth > 768) {
            slideNum.children[firstIndex].style.backgroundColor = "var(--invert-color)";
            slideNum.children[secondIndex].style.backgroundColor = "var(--invert-color)";
        } else {
            slideNum.children[firstIndex].style.backgroundColor = "var(--invert-color)";
        }
    }
    
    useEffect(() => {
        var slides = document.getElementsByClassName("carousel-slide");

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

            console.log(data.projectsPageCollection.items.sort((a, b) => {
                return  b.number - a.number
            }));

            // rerender the entire component with new data
            setPage(data.projectsPageCollection);
                
            for (let i = 0; i < slides.length; i++) {
                if (window.innerWidth > 768) {
                    slides[i].style.width = ((window.innerWidth - 60) / 2) + "px";
                } else {
                    slides[i].style.width = (window.innerWidth - 40) + "px";
                }

                if (i > 1) {
                    slides[i].style.display = "none";
                }
            }

            /* Slide-Num */
            let slideNum = document.getElementById("slide-num");
            for (let i = 0; i < slides.length; i++) {
                slideNum.innerHTML += "<div class='gray-circle'></div>"
            }

            /* Swipe (desktop only) */
            var touchPos1;
            var touchPos2;
            let carouselArea = document.querySelector(".carousel-area");
            carouselArea.addEventListener('mousedown', (e) => {
                touchPos1 = e.screenX;
            });
            carouselArea.addEventListener('mouseup', (e) => {
                touchPos2 = e.screenX;
                if (touchPos1 < touchPos2) {
                    document.getElementById("dec").click();
                } else if (touchPos1 > touchPos2) {
                    document.getElementById("inc").click();
                }
            });

            /* on page initialization */
            document.getElementById("inc").click();
            document.getElementById("dec").click();
        });

        const handleSlideWidth = () => {
            for (let i = 0; i < slides.length; i++) {
                if (window.innerWidth > 768) {
                    slides[i].style.width = ((window.innerWidth - 60) / 2) + "px";
                } else {
                    slides[i].style.width = (window.innerWidth - 40) + "px";
                }
            }
        };
        window.addEventListener('resize', handleSlideWidth);
        return () => {
            window.removeEventListener('resize', handleSlideWidth);
        };
    }, []);

    const moveCarousel = (e) => {
        IteratePageArray(e.target.id);
    }

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
                        <div className='control-buttons'>
                            <div id='dec' onClick={moveCarousel}>﹤</div>
                            <div id='inc' onClick={moveCarousel}>﹥</div>
                        </div>
                        <div id='carousel'>
                            {page.items.map((item, index) => (
                                <div key={index} className='carousel-slide'>
                                    <div className='slide'>
                                        <div className='info'>
                                            <h4>{item.date}</h4>
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
                    <div id='slide-num'></div>
                </div>
            </main>
        );
    }
}

export default Projects;
