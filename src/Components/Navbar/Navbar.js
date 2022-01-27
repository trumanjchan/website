import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    useEffect(() => {
        // Retrieve the value of locally-stored key 'data-theme', and set the theme
        const x = localStorage.getItem("data-theme");
        console.log("Retrieved preference: " + x + " mode");
        if (x === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            // Set checkbox to be unchecked (button in off state - left)
            document.getElementById('input').checked = false;
        }
        else {
            document.documentElement.setAttribute("data-theme", "dark");
            document.getElementById('input').checked = true;
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
        }
        else {
            document.body.style.transition = "all 300ms";
            document.documentElement.setAttribute("data-theme", "dark");
            console.log("dark mode");
            document.getElementById("div").style.transition = "all 300ms";
            localStorage.setItem("data-theme", "dark");
        }
    }

    return (
        <div className='Navbar'>
            <ul className='grid-container'>
                <li><Link to="/">About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/guides">Guides</Link></li>
                <li><Link to="/tasks">Tasks</Link></li>
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
