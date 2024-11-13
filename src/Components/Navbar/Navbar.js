import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Headshot from '../../Images/Truman_NY.webp';

function Navbar() {
    const [initialDesktopNavContentsHeight, setDesktopNavContentsHeight] = useState();
    const [initialMobileNavContentsHeight, setMobileNavContentsHeight] = useState();
    const [mobileNavBool, setMobileNavBool] = useState(0);

    useEffect(() => {
        setDesktopNavContentsHeight(60);


        // Retrieve the value of session-stored key 'data-theme', and set the theme
        const datatheme = sessionStorage.getItem("data-theme");
        console.log("Retrieved preference: " + datatheme + " mode");
        const menu = document.getElementById('dropdown');
        if (datatheme === "light" || datatheme === null) {
            document.documentElement.setAttribute("data-theme", "light");
            // Set checkbox to be unchecked (button in off state - left)
            document.getElementById('input').checked = false;
            // Don't apply the filter on dropdown icon (default color is black)
            menu.classList.remove('apply-filter');
        }
        else {
            document.documentElement.setAttribute("data-theme", "dark");
            document.getElementById('input').checked = true;
            menu.classList.add('apply-filter');
        }

        // On change, apply filter to image to contrast mode
        const input = document.getElementById('input');
        input.addEventListener('change', function() {
            if (sessionStorage.getItem("data-theme") === 'dark') {
                menu.classList.add('apply-filter');
            }
            else {
                menu.classList.remove('apply-filter');
            }
        });

        let currentPage = document.querySelector(".Navbar #contents li a.active");
        if (currentPage) {
            currentPage.parentNode.style = "opacity: 1 !important";
        }

        let navmodaloverlay = document.getElementById("navmodaloverlay");
        navmodaloverlay.parentNode.parentNode.appendChild(navmodaloverlay);
    },[]);

    const toggleMode = (e) => {
        // Switch to other mode if the user clicks toggle button
        if (e.currentTarget.checked === false) {
            // Set transition speed of body background color change
            document.body.style.transition = "all 300ms";
            // Create attribute and set value if doesn't exist, otherwise replace old value with new
            document.documentElement.setAttribute("data-theme", "light");
            console.log("light mode");
            // Set transition speed of button position change
            document.getElementById("div").style.transition = "all 300ms";
            // Set the user's preference in session storage
            sessionStorage.setItem("data-theme", "light");
        }
        else {
            document.body.style.transition = "all 300ms";
            document.documentElement.setAttribute("data-theme", "dark");
            console.log("dark mode");
            document.getElementById("div").style.transition = "all 300ms";
            sessionStorage.setItem("data-theme", "dark");
        }

        // On mobile view, if user touches toggle button then exit out of navbar menu
        closeMobileNav();
    }

    const toggleMobileView = () => {
        let nav = document.getElementById('nav');
        let navMenu = document.getElementById('contents');
        let navElements = navMenu.childNodes;

        nav.classList.toggle('change-bg-color');
        navMenu.classList.toggle('grid-container');

        for (let i = 0; i < navElements.length; i++) {
            if (i === (navElements.length - 1)) {
                break;
            } else if (navElements[i].style.opacity) {
                continue;
            } else if (i % 2 === 0) {
                navElements[i].classList.add('slide-right');
            } else {
                navElements[i].classList.add('slide-left');
            }
        }

        let bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.classList.toggle('t-overflow');
        if (bodyTag.style.touchAction === 'none') {
            bodyTag.style.touchAction = null;
        } else {
            bodyTag.style.touchAction = 'none';


            if (mobileNavBool === 0) {
                let mobileNavContentElement = document.getElementById("contents");
                setMobileNavContentsHeight(mobileNavContentElement.getBoundingClientRect().height);
                setMobileNavBool(1);

                if (window.innerWidth < 768) {
                    if (window.innerHeight < (mobileNavContentElement.getBoundingClientRect().height + document.getElementById("dropdown").offsetHeight + 70)) {
                        mobileNavContentElement.style.height = window.innerHeight - document.getElementById("dropdown").offsetHeight + "px";
                        mobileNavContentElement.style.overflowY = "scroll";
                    } else {
                        mobileNavContentElement.style.height = "fit-content";
                        mobileNavContentElement.style.overflowY = "hidden";
                    }
                }
            }
        }

        document.getElementById('navmodaloverlay').classList.toggle('t-visibility');
        document.getElementById('essentialinfo').classList.toggle('t-opacity');
        document.getElementById('menu-centerline').classList.toggle('t-fadeopacity');
        document.getElementById('menu-firstline').classList.toggle('t-ftransform');
        document.getElementById('menu-lastline').classList.toggle('t-ltransform');
    }
    
    const closeMobileNav = () => {
        if (window.innerWidth < 768) {
            document.getElementById("dropdown").click();
        }
    }

    const navigateToNewPage = () => {
        // If user clicks on the page they're currently on, in the mobile nav
        closeMobileNav();

        window.scrollTo(0, document.windowHeight);
    }

    window.addEventListener('resize', function() {
        let mobileNavContentElement = document.getElementById("contents");
        if (window.innerWidth < 768) {
            if (window.innerHeight < (initialMobileNavContentsHeight + document.getElementById("dropdown").offsetHeight + 70)) {
                mobileNavContentElement.style.height = window.innerHeight - document.getElementById("dropdown").offsetHeight + "px";
                mobileNavContentElement.style.overflowY = "scroll";
            } else {
                mobileNavContentElement.style.height = "fit-content";
                mobileNavContentElement.style.overflowY = "hidden";
            }
        } else {
            mobileNavContentElement.style.height = initialDesktopNavContentsHeight + "px";
        }


        if (window.innerWidth > 768) {
            let nav = document.getElementById('nav');
            let navMenu = document.getElementById('contents');
            let navElements = navMenu.childNodes;

            navMenu.classList.add('grid-container');
            nav.classList.remove('change-bg-color');

            for (let i = 0; i < navElements.length; i++) {
                if (i % 2 === 0) {
                    navElements[i].classList.remove('slide-right');
                } else {
                    navElements[i].classList.remove('slide-left');
                }
            }

            document.getElementsByTagName('body')[0].classList.remove('t-overflow');
            document.getElementsByTagName('body')[0].style.touchAction = null;
            document.getElementById('navmodaloverlay').classList.remove('t-visibility');
            document.getElementById('essentialinfo').classList.remove('t-opacity');
            document.getElementById('menu-centerline').classList.remove('t-fadeopacity');
            document.getElementById('menu-firstline').classList.remove('t-ftransform');
            document.getElementById('menu-lastline').classList.remove('t-ltransform');
        }
    });

    return (
        <div id='nav' className='Navbar'>
            <div id='dropdown' onClick={toggleMobileView}>
                <div id='menu-firstline'></div>
                <div id='menu-centerline'></div>
                <div id='menu-lastline'></div>
            </div>
            <div id='navmodaloverlay' onClick={closeMobileNav}></div>

            <ul id='contents' className='grid-container'>
                <li id='About' onClick={navigateToNewPage}><NavLink to="/">About</NavLink></li>
                <li id='Projects' onClick={navigateToNewPage}><NavLink to="/projects">Projects</NavLink></li>
                <li id='Guides' onClick={navigateToNewPage}><NavLink to="/guides">Guides</NavLink></li>
                <li id='Contact' onClick={navigateToNewPage}><NavLink to="/contact">Contact</NavLink></li>
                <li>
                    <label className="switch">
                        <input id='input' type="checkbox" onClick={toggleMode} />
                        <div id='div'></div>
                    </label>
                </li>
            </ul>
            <div id='essentialinfo'>
                <img id='headshot' className='headshot' src={Headshot} alt='Truman C.' />
                <div id='textcontainer'>
                    <div>Truman Chan (He/Him)</div>
                    <div>Junior Developer at&nbsp;ConcentricLife</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
