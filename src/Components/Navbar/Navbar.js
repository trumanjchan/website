import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import DropdownIcon from '../../Images/navigation.webp';
import Headshot from '../../Images/Truman_NY.webp';

function Navbar() {

    useEffect(() => {
        // Retrieve the value of locally-stored key 'data-theme', and set the theme
        const datatheme = localStorage.getItem("data-theme");
        console.log("Retrieved preference: " + datatheme + " mode");
        const menu = document.getElementById('dropdown');
        if (datatheme === "light") {
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
            // On mobile view, if user touches toggle button then exit out of navbar menu
            if (window.innerWidth < 640) {
                document.getElementById("dropdown").click();
            }
        }
        else {
            document.body.style.transition = "all 300ms";
            document.documentElement.setAttribute("data-theme", "dark");
            console.log("dark mode");
            document.getElementById("div").style.transition = "all 300ms";
            localStorage.setItem("data-theme", "dark");
            if (window.innerWidth < 640) {
                document.getElementById("dropdown").click();
            }
        }
    }

    const toggleMobileView = () => {
        var element1 = document.getElementById('contents');
        var element2 = document.getElementById('nav');
        element1.classList.toggle('grid-container');
        element2.classList.toggle('change-bg-color');
        
        document.getElementById('essentialinfo').classList.toggle('togglevisibility');
    }
    const navigateToNewPage = () => {
        window.scrollTo(0, document.windowHeight);
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 640) {
            var element1 = document.getElementById('contents');
            var element2 = document.getElementById('nav');
            element1.classList.add('grid-container');
            element2.classList.remove('change-bg-color');

            document.getElementById('essentialinfo').classList.remove('togglevisibility');

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
            <div className='mobileview' onClick={toggleMobileView}><img id='dropdown' src={DropdownIcon} alt='Navigation icon by maulaga on flaticon.com' /></div>
            <ul id='contents' className='grid-container'>
                <li onClick={navigateToNewPage}><Link to="/">About</Link></li>
                <li onClick={navigateToNewPage}><Link to="/guides">Guides</Link></li>
                <li onClick={navigateToNewPage}><Link to="/tasks">Tasks</Link></li>
                <li onClick={navigateToNewPage}><Link to="/contact">Contact</Link></li>
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
                    <div>Junior Developer at Concentric&nbsp;Health&nbsp;Experience</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
