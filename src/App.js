import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import About from '../src/Pages/About/About';
import Home from '../src/Pages/Home/Home';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<About/>} />
        <Route path='/gh-pages-url/home' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
