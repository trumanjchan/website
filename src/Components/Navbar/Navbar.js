import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    function toggleMode() {
        document.querySelector("body").classList.toggle("dark-mode");
    }

    return (
        <div className='Navbar'>
            <ul className='grid-container'>
                <li><Link to="/">About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><button onClick={toggleMode}>Light/Dark</button></li>
            </ul>
        </div>
    );
}

export default Navbar;
