import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, MainPage, LogoutPage } from './components/organisms';
import './utils/functions/utils.js'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
    </Router>
  );
}

export default App;
