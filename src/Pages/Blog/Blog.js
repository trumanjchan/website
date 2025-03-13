import React, { useState, useEffect } from 'react';
import './Blog.scss';
import Navbar from '../../Components/Navbar/Navbar';
import { formatDate } from '../../utils';

const query = `
{
    blogPageCollection(order: [date_DESC]) {
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
            if (blogpost !== document.querySelectorAll(".blog-post-button")[i]) {
                document.querySelectorAll(".blog-post-button")[i].style.backgroundColor = null;
                document.querySelectorAll(".blog-post-button")[i].style.color = null;
            }
        }
        blogpost.style.backgroundColor = 'var(--main-bg-color)';
        blogpost.style.color = 'var(--invert-color)';

        const foundObject = page.items.find(obj => obj.title === blogpost.innerText);
        //console.log(foundObject)

        document.getElementById("title").innerText = foundObject.title;
        document.getElementById("date").innerText = formatDate(foundObject.date, true);
        document.getElementById("body").innerText = foundObject.body.replaceAll("</br>", "\n");
        for (let i = 0; i < foundObject.photosCollection.items.length; i++) {
            let imgEle = document.createElement('img');
            imgEle.src = foundObject.photosCollection.items[i].url;
            imgEle.style.width = "100%";
            imgEle.alt = "";
            let targetEle = document.getElementById('photos');
            targetEle.appendChild(imgEle);
        }
    }

    function mobileBlogPostNavbar(e) {
        if (window.innerWidth < 768) {
            document.getElementById("tabs").insertBefore(e.target, document.getElementById("tabs").firstChild);
            if ((e.target.innerText === document.getElementById("title").innerText) && (document.getElementById("tabscolumn").style.height !== "fit-content")) {
                document.getElementById("tabscolumn").style.height = "fit-content";
            } else {
                document.getElementById("tabscolumn").style.height = document.getElementById("dropdown").getBoundingClientRect().height + "px";
            }
        }
    }

    const checkHash = (page) => {
        const hash = window.location.hash;
        const blogPostButton = document.getElementsByClassName("blog-post-button");
        
        const foundObject = page.items.find(obj => ("#" + obj.title.replaceAll(' ', '-')) === hash);

        if (foundObject) {
            const buttonIndex = page.items.indexOf(foundObject);
            blogPostButton[buttonIndex].click();
        } else {
            blogPostButton[0].style.backgroundColor = 'var(--main-bg-color)';
            blogPostButton[0].style.color = 'var(--invert-color)';
        }
    }

    const resizeBlogPage = () => {
        if (window.innerWidth < 768) {
            document.getElementById("tabscolumn").style.height = document.getElementById("dropdown").getBoundingClientRect().height + "px";
            for (let i = 0; i < document.querySelector("#tabs").children.length; i++) {
                document.querySelectorAll(".blog-post-button")[i].style.height = document.getElementById("dropdown").getBoundingClientRect().height + "px";
            }
        } else {
            document.getElementById("tabscolumn").style.height = "100%";
            for (let i = 0; i < document.querySelector("#tabs").children.length; i++) {
                document.querySelectorAll(".blog-post-button")[i].style.height = "fit-content";
            }
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

            checkHash(data.blogPageCollection);
            resizeBlogPage();
        });

        window.addEventListener("resize", resizeBlogPage);
        return () => {
            window.removeEventListener("resize", resizeBlogPage);
        };
    }, []);

    const clickPost = (e) => {
        changePost(e.target);
        mobileBlogPostNavbar(e);
    };

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
                    <div id='tabscolumn'>
                        <div id="tabs">
                            {page.items.map((item, index) => (
                                <a key={index} className='blog-post-button' onClick={clickPost} href={`#${item.title.replaceAll(' ', '-')}`}>{item.title}</a>
                            ))}
                        </div>
                    </div>
                    <div className='outer-blog-container'>
                        <div className='inner-blog-container'>
                            <p id='title'>{page.items[0].title}</p>
                            <p id='date'>{page.items[0].date}</p>
                            <p id='body'>{page.items[0].body}</p>
                        </div>
                    </div>
                    <div className='photos-container'>
                        <div id='photos'>
                            {page.items[0].photosCollection.items.map((item, index) => (
                                <img key={index} src={item.url} alt="" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Blog;
