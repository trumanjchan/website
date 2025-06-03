import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import About from '../src/Pages/About/About';
import Projects from './Pages/Projects/Projects';
import Blog from '../src/Pages/Blog/Blog';
import Contact from './Pages/Contact/Contact';
import Sent from './Pages/Contact/Sent/Sent';
import PageNotFound from './Pages/PageNotFound/PageNotFound';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/sent' element={<Sent/>} />
        <Route path='/404' element={<PageNotFound/>} />
        <Route path='*' element={<Navigate replace to='/404'/>} />
      </Routes>
    </Router>
  );
}

export default App;
