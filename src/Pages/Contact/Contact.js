import React, { useEffect } from 'react';
import './Contact.css';
import Navbar from '../../Components/Navbar/Navbar';
import lightbg from "../../Images/Golden_Gate_Bridge_side.webp";
import darkbg from "../../Images/Track_Field_after_Rain.webp";

function Contact() {

    useEffect(() => {
        const x = localStorage.getItem("data-theme");
        const bgimage = document.getElementById('container');
        if (x === "light" || x === null) {
            bgimage.style.backgroundImage = `url(${lightbg})`;
        }
        else {
            bgimage.style.backgroundImage = `url(${darkbg})`;
        }

        const input = document.getElementById('input');
        input.addEventListener('click', function() {
            if (localStorage.getItem("data-theme") === 'dark') {
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
        let contact = document.getElementsByClassName("Contact")[0];
        let navHeight = document.getElementById("nav").offsetHeight;
        let formcontainerHeight = document.getElementById("formcontainer").offsetHeight;

        if (window.innerWidth < 768) {
            contact.style.minHeight = formcontainerHeight + "px";
        }
        else {
            contact.style.minHeight = navHeight + formcontainerHeight + "px";
        }
    });
    
    return (
        <main className='Contact'>
            <Navbar />
            <div id='container'>
                <div id='formcontainer'>
                    <form action="https://api.web3forms.com/submit" method="POST">
                        <input type="hidden" name="apikey" value="53912a08-e25a-4ba5-a3fe-686dca14461e" />

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
