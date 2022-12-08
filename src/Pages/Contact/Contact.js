import React, { useEffect } from 'react';
import './Contact.css';
import Navbar from '../../Components/Navbar/Navbar';

function Contact() {

    useEffect(() => {
        const x = localStorage.getItem("data-theme");
        const bgimage = document.getElementById('bgimage');
        if (x === "light") {
            bgimage.classList.remove('apply-inset');
        }
        else {
            bgimage.classList.add('apply-inset');
        }

        const input = document.getElementById('input');
        input.addEventListener('change', function() {
            if (localStorage.getItem("data-theme") === 'dark') {
                bgimage.classList.add('apply-inset');
            }
            else {
                bgimage.classList.remove('apply-inset');
            }
        });
    },[]);
    
    return (
        <main className='Contact'>
            <Navbar />
            <div id='bgimage' className='container'>
                <div id='formcontainer' className='formcontainer'>
                    <form action="https://formspree.io/f/xrgjqdle" method="POST">
                        <div>@TrumanChan</div>
                        <div className='typing-area'>
                            <label>Email:</label>
                            <input type="email" name="email" required/>
                            <label>Message:</label>
                            <textarea name="message"></textarea>
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Contact;
