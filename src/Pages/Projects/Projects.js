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
            image {
                fileName,
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
            });
    }, []);

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
                <div id='container' className='container'>
                    {page.items.map((item, index) => (
                        <div key={index}>
                            <h1>{item.title}</h1>
                            <h3>{item.date}</h3>
                            <h2>{item.desc}</h2>
                            <img src={item.image.url} className="screenshot" alt={item.image.fileName} width="853.33px" height="480px" />
                        </div>
                    ))}
                </div>
            </main>
        );
    }
}

export default Projects;
