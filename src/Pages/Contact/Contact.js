import React from 'react';
import './Contact.css';
import Navbar from '../../Components/Navbar/Navbar';

function Contact() {
    return (
        <main className='Contact'>
            <Navbar />
            <div className='form-container'>
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
        </main>
    );
}

export default Contact;
