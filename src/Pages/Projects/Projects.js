import React, {useState, useEffect} from 'react';
import './Projects.css';
import Navbar from '../../Components/Navbar/Navbar';

const query = `
{
    projectsPageCollection {
        items {
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

                // rerender the entire component with new data
                setPage(data.projectsPageCollection);
                console.log(data.projectsPageCollection.items);

                let slides =  document.getElementsByClassName("carousel-slide")
                for (let i = 0; i < slides.length; i++) {
                    document.getElementsByClassName("carousel-slide")[i].style.width = ((window.innerWidth - 60) / 2) + "px";
                }
            });
    }, []);

    window.addEventListener('resize', function() {
        let slides =  document.getElementsByClassName("carousel-slide")
        for (let i = 0; i < slides.length; i++) {
            document.getElementsByClassName("carousel-slide")[i].style.width = ((window.innerWidth - 60) / 2) + "px";
        }
    });

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
                    <div className='carousel'>
                        <div className='control-buttons'>
                            <div id='dec'>﹤</div>
                            <div id='inc'>﹥</div>
                        </div>
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
            </main>
        );
    }
}

export default Projects;
