import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './BlogList.css';
import Navbar from '../../Components/Navbar/Navbar';
import { formatDate } from '../../utils';

function BlogList() {
    const [postTitles, setPostTitles] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem(`postTitles`)) {
            setPostTitles(JSON.parse(sessionStorage.getItem(`postTitles`)));
        } else {
            const postTitlesQuery = `
            {
                blogPageCollection(order: [date_DESC]) {
                    items {
                        title,
                        date
                    }
                }
            }
            `;
            window.fetch(`https://graphql.contentful.com/content/v1/spaces/` + process.env.REACT_APP_SPACE_ID + `/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authenticate the request
                    Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
                },
                // send the GraphQL query
                body: JSON.stringify({ query: postTitlesQuery }),
            })
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }

                const fetchedPostTitles = data.blogPageCollection.items;
                setPostTitles(fetchedPostTitles);
                sessionStorage.setItem(`postTitles`, JSON.stringify(fetchedPostTitles));
            });
        }
    }, []);

    if (!postTitles) {
        return (
            <main className='BlogList'>
                <Navbar />
            </main>
        )
    } else {
        return (
            <main id='BlogList'>
                <Navbar />
                <div className='content'>
                    <div className='blog-list'>
                        {postTitles.map((item, index) => (
                            <NavLink key={index} className="blog-title" to={`/blog/${encodeURIComponent(item.title)}`}>
                                <div>{formatDate(item.date)}</div>
                                <div>{item.title}</div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </main>
        );
    }
}

export default BlogList;
