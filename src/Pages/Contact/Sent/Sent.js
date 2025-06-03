import './Sent.css';
import Navbar from '../../../Components/Navbar/Navbar';

function Sent() {
    return (
        <main id='Sent'>
            <Navbar />
            <div className='content'>
                <div id='container' className='container'>
                    <div className='thank-you'>Message sent to Truman!</div>
                </div>
            </div>
        </main>
    );
}

export default Sent;
