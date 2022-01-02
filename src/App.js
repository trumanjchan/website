import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from '../src/Pages/About/About';
import Home from '../src/Pages/Home/Home';
import Tasks from './Pages/Tasks/Tasks';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<About/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/tasks' element={<Tasks/>} />
      </Routes>
    </Router>
  );
}

export default App;
