import React, { useState, useEffect } from 'react';
import './Blog.scss';
import Navbar from '../../Components/Navbar/Navbar';

const query = `
{
    blogPageCollection {
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
`

function Blog() {
    const [page, setPage] = useState(null);

    function changePost(blogpost) {
        document.getElementById("photos").innerHTML = null;
        for (let i = 0; i < page.items.length; i++) {
            document.querySelectorAll(".tabscolumn .blog-post-button")[i].style.backgroundColor = null;
            document.querySelectorAll(".tabscolumn .blog-post-button")[i].style.color = null;
        }
        blogpost.style.backgroundColor = 'var(--main-bg-color)';
        blogpost.style.color = 'var(--invert-color)';

        const foundObject = page.items.find(obj => obj.title === blogpost.innerText);
        //console.log(foundObject)

        document.getElementById("title").innerText = foundObject.title;
        document.getElementById("date").innerText = foundObject.date;
        document.getElementById("body").innerText = foundObject.body.replaceAll("</br>", "\n\n");
        for (let i = 0; i < foundObject.photosCollection.items.length; i++) {
            let imgEle = document.createElement('img');
            imgEle.src = foundObject.photosCollection.items[i].url;
            imgEle.style.width = "100%";
            let targetEle = document.getElementById('photos');
            targetEle.appendChild(imgEle);
        }
    }

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
            console.log(data.blogPageCollection);

            document.getElementsByClassName("blog-post-button")[0].click();
        });
    },[]);

    if (!page) {
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
                    <div className='tabscolumn'>
                        <div className="tabs">
                            {page.items.map((item, index) => (
                                <div key={index} className='blog-post-button' onClick={e => changePost(e.target)}>{item.title}</div>
                            ))}
                        </div>
                    </div>
                    <div className='outer-blog-container'>
                        <div className='inner-blog-container'>
                            <p id='title'></p>
                            <p id='date'></p>
                            <p id='body'></p>
                        </div>
                    </div>
                    <div className='photos-container'>
                        <div id='photos'></div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Blog;
