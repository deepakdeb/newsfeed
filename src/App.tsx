import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Most_emailed from './components/mostEmailed/Most_emailed';
import Most_shared from './components/mostShared/Most_shared';
import Most_viewed from './components/mostViewed/Most_viewed';

function App() {
  
  return (
    <Router>      
        <Header />
        <div className='container'>
        <Routes>
          <Route path='/' element={<Most_emailed />} />
          <Route path='/most-viewed' element={<Most_viewed />} />
          <Route path='/most-shared' element={<Most_shared />} />
          <Route path='/most-emailed' element={<Most_emailed />} />
        </Routes>
        </div>
        <Footer />      
    </Router>
  );
}

export default App;
