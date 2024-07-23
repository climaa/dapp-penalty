import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

function MainPage() {
  return (
	<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/login" className="App-link">Login</Link>
        </header>
      </div>
  );
}

export default MainPage;