import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/organisms/LoginPage.js'; 
import MainPage from './components/organisms/MainPage.js';
import './utils/functions/utils.js'

import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;
