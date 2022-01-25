import React from 'react';
import './PageNotFound.css';
import Navbar from '../../Components/Navbar/Navbar';

function PageNotFound() {
    return (
        <main className='PageNotFound'>
            <Navbar />
            <div className='container'>
                <div className='title'>404</div>
                <div className='description'>Sorry! That page doesn't exist! The only endpoints that exist currently are <i>/</i>, <i>/home</i>, <i>/guides</i>, <i>/tasks</i>, and <i>/404</i>.</div>
            </div>
        </main>
    );
}

export default PageNotFound;
