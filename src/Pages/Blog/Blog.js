import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './Blog.css';
import Navbar from '../../Components/Navbar/Navbar';
import { formatDate } from '../../utils';

function Blog() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [postTitles, setPostTitles] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem(`postTitles`)) {
            setPostTitles(JSON.parse(sessionStorage.getItem(`postTitles`)));
        } else {
            const postTitlesQuery = `
            {
                blogPageCollection(order: date_DESC) {
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
    }, [slug]);

    useEffect(() => {
        document.getElementById("blog")?.scrollIntoView({ behavior: "instant", block: "start" });  //for iOS

        const decodedSlug = decodeURIComponent(slug);

        if (sessionStorage.getItem(`post-${decodedSlug}`)) {
            setPost(JSON.parse(sessionStorage.getItem(`post-${decodedSlug}`)));
        } else {
            const currentPostQuery = `
            {
                blogPageCollection(where: { title: "${decodedSlug}" }, limit: 1) {
                    items {
                        title,
                        date,
                        body,
                        photosCollection {
                            items {
                                title,
                                description,
                                url,
                                fileName,
                                width,
                                height
                            }
                        }
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
                body: JSON.stringify({ query: currentPostQuery }),
            })
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }
                
                const fetchedPost = data.blogPageCollection.items[0];
                setPost(fetchedPost);
                sessionStorage.setItem(`post-${decodedSlug}`, JSON.stringify(fetchedPost));
            });
        }
    }, [slug]);

    const clickPost = () => {
        document.getElementById("blog").scrollTo(0, 0);  //for desktop
    }

    if (!post) {
        return (
            <main className='Blog'>
                <Navbar />
            </main>
        )
    } else {
        return (
            <main className='Blog'>
                <Navbar />
                <div id='container' className='container'>
                    <div id='tabscolumn'>
                        <div id="tabs">
                            {postTitles.map((item, index) => (
                                <NavLink key={index} className="blog-post-button" to={`/blog/${encodeURIComponent(item.title)}`} onClick={clickPost}>{item.title}</NavLink>
                            ))}
                        </div>
                    </div>
                    <div className='blog-container'>
                        <div className="fade top"></div>
                        <div id='blog'>
                            <p id='title'>{post.title}</p>
                            <p id='date'>{formatDate(post.date, true)}</p>
                            <pre id='body'>{post.body}</pre>
                        </div>
                        <div className="fade bot"></div>
                    </div>
                    <div className='photos-container'>
                        <div id='photos'>{post.photosCollection.items.map((item, index) => {
                            return <img key={index} src={item.url} alt="" />
                        })}</div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Blog;
