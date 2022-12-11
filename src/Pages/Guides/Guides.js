import React, { useEffect } from 'react';
import './Guides.css';
import Navbar from '../../Components/Navbar/Navbar';

function Guides() {
    
    useEffect(() => {
        document.getElementById("defaultOpen").click();
    },[]);

    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablinks');
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        document.getElementById(tabName).style.display = 'block';
        evt.currentTarget.className += ' active';
    }

    return (
        <main className='Guides'>
            <Navbar />
            <div id='container' className='container'>
                <div className='tabscolumn'>
                    <button className='tablinks' onClick={event => openTab(event, 'Overview')} id='defaultOpen'>Overview</button>
                    <button className='tablinks' onClick={event => openTab(event, 'First')}>Viewing Localhost on Different Devices</button>
                </div>
                <div className='guidecontent'>
                    <div id='Overview' className='tabcontent'>
                        <h1>Overview</h1>
                        <p>Welcome to my Guides Page!</p>
                    </div>
                    <div id='First' className='tabcontent'>
                        <h1>Viewing Localhost on Different Devices</h1>
                        <h3>Introduction</h3>
                        <p>When working on a web application, you need to make sure your pages and components are built to be <i>responsive</i>. This means for all possible devices a user may access your web app from, ranging from large computer monitors to an iPhone SE, nothing in your web app should break. A developer tool that allows you to check for responsiveness is Inspect Element, where you can go on a web browser such as Google Chrome, Safari, or Firefox, and right click anywhere on the page to Inspect.</p>
                        <p>From this browser developer view you can see how your web app looks on different devices. However, it gets annoying to have to repeatedly code and pull up the browser to see if your page changed correctly, then minimize the browser again to go back into the code. You can hook up your computer to an external monitor by VGA, DVI, HDMI, or DisplayPort, but computers have only a limited number of these ports so you would potentially need to buy an adapter if you wanted to hook up more than one external monitor.</p>
                        <p>To be efficient in checking the range of resolution widths (responsiveness) your web app should function normally in, you should Inspect Element on a connected external monitor while also viewing localhost on devices you have on hand.</p>
                        <h3>Mac OS</h3>
                        <p>On your apple computer where you are connected to wifi and running localhost on a specific port, click the apple icon on the top left of your screen and navigate to System Preferences's Network. Here it will say you are connected to wifi and your device has a specific ip address.</p>
                        <ol>
                            <li>On your other device, open a browser.</li>
                            <li>Input the ip address you found on your mac into the address bar.</li>
                            <li>Then add a colon and type the port your mac's localhost is running on.</li>
                            <li>Hit enter to navigate to that <i>ipaddress:port</i></li>
                        </ol>
                        <h3>Windows OS</h3>
                        <p>On your windows computer where you are connected to wifi and running localhost on a specific port, open cmd prompt and find your IPv4 Address.</p>
                        <ol>
                            <li>On your other device, open a browser.</li>
                            <li>Input the IPv4 Address you found on your windows pc into the address bar.</li>
                            <li>Add a colon, then type the port your windows pc's localhost is running on.</li>
                            <li>Hit enter to navigate to that <i>ipaddress:port</i></li>
                        </ol>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Guides;
