import React from 'react';
import { Link } from 'react-router-dom';
import './AboutNavbar.css';

function AboutNavbar() {
    // Clicking on a navbar tab forces a refresh, which runs 'window.onload()'. Forces toggle button to be in activated position or not.
    function forceRefresh(e) {
        window.location.href(e.Link).reload();
    }
    window.onload = function() {
        if (x === "light") {
            document.getElementById('input').checked = false;
        }
        else {
            document.getElementById('input').checked = true;
        }
    }

    // Finds whether pre-reload 'data-theme' was light or dark, then renders that theme.
    const x = localStorage.getItem("data-theme");
    console.log(x);
    if (x === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    const toggleMode = (e) => {
        /* Switch to Light Mode */
        if (e.currentTarget.checked === false) {
            // Sets the custom HTML attribute
            document.body.style.transition = "all 1s";
            document.documentElement.setAttribute("data-theme", "light");
            document.getElementById("div").style.transition = "all 300ms";
            // Sets the user's preference in local storage
            localStorage.setItem("data-theme", "light");
        }
        else {
            /* Switch to Dark Mode */
            // Sets the custom HTML attribute
            document.body.style.transition = "all 1s";
            document.documentElement.setAttribute("data-theme", "dark");
            document.getElementById("div").style.transition = "all 300ms";
            // Sets the user's preference in local storage
            localStorage.setItem("data-theme", "dark");
        }
    }

    return (
        <div className='AboutNavbar'>
            <ul className='grid-container'>
                <li><Link to="/" onClick={forceRefresh}>About</Link></li>
                <li><Link to="/home">Home</Link></li>
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

export default AboutNavbar;
