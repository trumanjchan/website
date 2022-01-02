import React from 'react';
import { Link } from 'react-router-dom';
import './SubNavbar.css';

function SubNavbar() {
    // Navigates to navbar page and reloads that page.
    function forceRefresh(e) {
        window.location.href(e.Link).reload();
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

    return (
        <div className='SubNavbar'>
            <ul className='grid-container'>
                <li><Link to="/" onClick={forceRefresh}>About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/tasks">Tasks</Link></li>
            </ul>
        </div>
    );
}

export default SubNavbar;
