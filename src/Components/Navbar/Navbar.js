import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
            document.documentElement.setAttribute("data-theme", "light");
            // Sets the user's preference in local storage
            localStorage.setItem("data-theme", "light");
        }
        else {
            /* Switch to Dark Mode */
            // Sets the custom HTML attribute
            document.documentElement.setAttribute("data-theme", "dark");
            // Sets the user's preference in local storage
            localStorage.setItem("data-theme", "dark");
        }
    }

    return (
        <div className='Navbar'>
            <ul className='grid-container'>
                <li><Link to="/" onClick={forceRefresh}>About</Link></li>
                <li><Link to="/home" onClick={forceRefresh}>Home</Link></li>
                <li>
                    <label className="switch">
                        <input id='input' type="checkbox" onClick={toggleMode} />
                        <div></div>
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
