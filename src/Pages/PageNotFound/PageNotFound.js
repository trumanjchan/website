import './PageNotFound.css';
import Navbar from '../../Components/Navbar/Navbar';

function PageNotFound() {
    return (
        <main className='PageNotFound'>
            <Navbar />
            <div id='container' className='container'>
                <div className='formcontainer'>
                    <div className='title'>404</div>
                    <div className='description'>Sorry!<br/>That page doesn't exist!<br/><br/>The only endpoints that exist currently are:<br/><i>/</i>, <i>/projects</i>, <i>/blog</i>, <i>/contact</i>, <i>/sent</i>, and <i>/404</i>.</div>
                </div>
            </div>
        </main>
    );
}

export default PageNotFound;
