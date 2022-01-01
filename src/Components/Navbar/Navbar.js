import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
                <li><Link to="/">About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li>
                    <label className="switch">
                        <input type="checkbox" onClick={toggleMode} />
                        <div></div>
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
