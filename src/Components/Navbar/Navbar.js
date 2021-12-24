import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div className='Navbar'>
            <ul>
                <li><Link to="/">About</Link></li>
                <li><Link to="/home">Home</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;
