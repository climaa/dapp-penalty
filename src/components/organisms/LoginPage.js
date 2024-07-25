/**
 * {@link https://tailwindflex.com/@khalid/login-form-10}
 */
import React, { useState } from "react";
import { Input, Button } from "../atoms";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const validateLogin = async (e) => {
    e.preventDefault(); // Prevent form from actually submitting
    
    let user = null;
    try {
      const response = await fetch(`http://localhost:3001/users?username=${username}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      user = await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoginStatus('Failed to fetch user data.');
      return;
    }
  
    if (user.length > 0 && user.at(0)?.password === password) {
      navigate('/');
      const obj = { id: user.at(0).id, isLoggedIn: true, username: user.at(0).username };
      sessionStorage.setItem('user', JSON.stringify(obj));
    } else {
      setLoginStatus('Invalid username or password.');
    }
  };

  return (
    <div className="dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen h-screen p-5">
      <div className="bg-white shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          Dapp Penalty Login
        </h1>
        <form onSubmit={validateLogin}>
          <div className="mb-4">
            <Input type="text" placeholder="Username" data-testid="login-username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-6">
            <Input type="password" placeholder="Password" data-testid="login-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <Button 
				className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600"
				data-testid="submit-button">
              Login
            </Button>
          </div>
          {loginStatus && <p className="text-center text-red-500" data-testid="login-status">{loginStatus}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
