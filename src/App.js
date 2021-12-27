import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from '../src/Pages/About/About';
import Home from '../src/Pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/my-website' element={<About/>} />
        <Route path='/my-website/home' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
