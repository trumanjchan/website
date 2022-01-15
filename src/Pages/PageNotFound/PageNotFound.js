import React from 'react';
import './PageNotFound.css';
import SubNavbar from '../../Components/SubNavbar/SubNavbar';

function PageNotFound() {
    return (
        <main className='PageNotFound'>
            <SubNavbar />
            <div className='container'>
                <div className='title'>404</div>
                <div className='description'>Sorry! Either the page doesn't exist or because this web app is hosted on Github Pages as a Project Page, pages other than the About page that are refreshed will lead you to this 404 page.</div>
            </div>
        </main>
    );
}

export default PageNotFound;
