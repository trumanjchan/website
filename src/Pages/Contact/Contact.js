import React, { useEffect } from 'react';
import './Contact.scss';
import Navbar from '../../Components/Navbar/Navbar';
import lightbg from "../../Images/Golden_Gate_Bridge_side.webp";
import darkbg from "../../Images/Track_Field_after_Rain.webp";

function Contact() {

    useEffect(() => {
        const x = sessionStorage.getItem("data-theme");
        const bgimage = document.getElementById('container');
        if (x === "light" || x === null) {
            bgimage.style.backgroundImage = `url(${lightbg})`;
        }
        else {
            bgimage.style.backgroundImage = `url(${darkbg})`;
        }

        const input = document.getElementById('input');
        input.addEventListener('click', function() {
            if (sessionStorage.getItem("data-theme") === 'dark') {
                bgimage.style.backgroundImage = `url(${lightbg})`;
            }
            else {
                bgimage.style.backgroundImage = `url(${darkbg})`;
            }
        });

        
        let contact = document.getElementsByClassName("Contact")[0];
        let navHeight = document.getElementById("nav").offsetHeight;
        let formcontainerHeight = document.getElementById("formcontainer").offsetHeight;

        if (window.innerWidth < 768) {
            contact.style.minHeight = formcontainerHeight + "px";
        }
        else {
            contact.style.minHeight = navHeight + formcontainerHeight + "px";
        }
    },[]);

    window.addEventListener('resize', function() {
        if (window.location.pathname === "/contact") {
            let contact = document.getElementsByClassName("Contact")[0];
            let navHeight = document.getElementById("nav").offsetHeight;
            let formcontainerHeight = document.getElementById("formcontainer").offsetHeight;

            if (window.innerWidth < 768) {
                contact.style.minHeight = formcontainerHeight + "px";
            } else {
                contact.style.minHeight = navHeight + formcontainerHeight + "px";
            }
        }
    });
    
    return (
        <main className='Contact'>
            <Navbar />
            <div id='container'>
                <div id='formcontainer'>
                    <form action="https://api.web3forms.com/submit" method="POST">
                        <input type="hidden" name="apikey" value={process.env.REACT_APP_WEB3FORMS_KEY} />

                        <div className="sendto">@TrumanChan</div>
                        <div className='typing-area'>
                            <label>Email:</label>
                            <input type="email" name="email" required />
                            <label>Message:</label>
                            <textarea name="message" required></textarea>
                        </div>

                        <input type="hidden" name="redirect" value={window.location.protocol + "//" + window.location.host + "/sent"} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Contact;
