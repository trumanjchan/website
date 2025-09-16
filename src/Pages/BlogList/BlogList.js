import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './BlogList.css';
import Navbar from '../../Components/Navbar/Navbar';
import { formatDate } from '../../utils';

const query = `
{
    blogPageCollection(order: [date_DESC]) {
        items {
            title,
            date
        }
    }
}
`

function BlogList() {
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

            setPage(data.blogPageCollection);
        });
    }, []);

    if (!page) {
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
                        {page.items.map((item, index) => (
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
