import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import DropdownIcon from '../../Images/navigation.webp';

function Navbar() {

    useEffect(() => {
        // Retrieve the value of locally-stored key 'data-theme', and set the theme
        const x = localStorage.getItem("data-theme");
        console.log("Retrieved preference: " + x + " mode");
        const menu = document.getElementById('dropdown');
        if (x === "light") {
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
            if (window.innerWidth < 600) {
                document.getElementById("dropdown").click();
            }
        }
        else {
            document.body.style.transition = "all 300ms";
            document.documentElement.setAttribute("data-theme", "dark");
            console.log("dark mode");
            document.getElementById("div").style.transition = "all 300ms";
            localStorage.setItem("data-theme", "dark");
            if (window.innerWidth < 600) {
                document.getElementById("dropdown").click();
            }
        }
    }

    const toggleMobileView = () => {
        var element1 = document.getElementById('contents');
        var element2 = document.getElementById('nav');
        element1.classList.toggle('grid-container');
        element2.classList.toggle('change-bg-color');
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
          var element1 = document.getElementById('contents');
          var element2 = document.getElementById('nav');
          element1.classList.add('grid-container');
          element2.classList.remove('change-bg-color');
        }
    });

    return (
        <div id='nav' className='Navbar'>
            <div className='mobileview' onClick={toggleMobileView}><img id='dropdown' src={DropdownIcon} alt='https://www.flaticon.com/premium-icon/navigation_2811759?term=horizontal%20bars&related_id=2811759' /></div>
            <ul id='contents' className='grid-container'>
                <li><Link to="/">About</Link></li>
                <li><Link to="/guides">Guides</Link></li>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li>
                    <label className="switch">
                        <input id='input' type="checkbox" onClick={toggleMode} />
                        <div id='div'></div>
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
