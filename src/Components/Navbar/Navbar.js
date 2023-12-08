import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Menu from '../../Images/icons8-menu.svg';
import Headshot from '../../Images/Truman_NY.webp';

function Navbar() {

    useEffect(() => {
        // Retrieve the value of locally-stored key 'data-theme', and set the theme
        const datatheme = localStorage.getItem("data-theme");
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
            if (localStorage.getItem("data-theme") === 'dark') {
                menu.classList.add('apply-filter');
            }
            else {
                menu.classList.remove('apply-filter');
            }
        });

        if (document.getElementById('container')) {
            if (window.innerWidth > 640) {
                document.getElementById('container').classList.remove('heightfrommissingnavbar');
            }
            else {
                document.getElementById('container').classList.add('heightfrommissingnavbar');
            }
        }

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
            // Set the user's preference in local storage
            localStorage.setItem("data-theme", "light");
        }
        else {
            document.body.style.transition = "all 300ms";
            document.documentElement.setAttribute("data-theme", "dark");
            console.log("dark mode");
            document.getElementById("div").style.transition = "all 300ms";
            localStorage.setItem("data-theme", "dark");
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
        }

        document.getElementById('navmodaloverlay').classList.toggle('t-visibility');
        document.getElementById('essentialinfo').classList.toggle('t-opacity');
    }
    
    const closeMobileNav = () => {
        if (window.innerWidth < 640) {
            document.getElementById("dropdown").click();
        }
    }

    const navigateToNewPage = () => {
        // If user clicks on the page they're currently on, in the mobile nav
        closeMobileNav();

        window.scrollTo(0, document.windowHeight);
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 640) {
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

            if (document.getElementById('container')) {
                document.getElementById('container').classList.remove('heightfrommissingnavbar');
            }
        }
        else {
            if (document.getElementById('container')) {
                document.getElementById('container').classList.add('heightfrommissingnavbar');
            }
        }
    });

    return (
        <div id='nav' className='Navbar'>
            <div className='mobileview' onClick={toggleMobileView}><img id='dropdown' src={Menu} alt='Menu' /></div>
            <div id='navmodaloverlay' onClick={closeMobileNav}></div>

            <ul id='contents' className='grid-container'>
                <li id='About' onClick={navigateToNewPage}><NavLink to="/">About</NavLink></li>
                <li id='Guides' onClick={navigateToNewPage}><NavLink to="/guides">Guides</NavLink></li>
                <li id='Tasks' onClick={navigateToNewPage}><NavLink to="/tasks">Tasks</NavLink></li>
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
