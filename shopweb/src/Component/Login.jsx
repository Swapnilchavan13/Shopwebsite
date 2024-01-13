import React, { useState } from 'react';
import '../Styles/login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserData } from './UserData';

export const Login = () => {
  const navigate = useNavigate();
  const isloggedin = localStorage.getItem('isLoginSuccessful') || false;

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://62.72.59.146:3010/allusers');
      const users = await response.json();

      // Find the user with matching credentials
      const matchingUser = users.find(
        (user) => user.usernumber === mobileNumber && user.userpassword === password
      );

      if (matchingUser) {
        // Login successful
        localStorage.setItem('username', matchingUser.username);
        localStorage.setItem('uid', matchingUser._id);
        localStorage.setItem('usermobile', matchingUser.usernumber);
        localStorage.setItem('isLoginSuccessful', true);

        toast.success('Login Successful', {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // navigate('/');
        window.location.reload();

      } else {
        // Login failed
        toast.error('Invalid credentials. Please try again.', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const newAccount = () => {
    navigate('/register');
  };

  return (
    <div id='logindiv'>
      {isloggedin ? (
        <UserData />
      ) : (
        <>
          <ToastContainer />
          <br />
          <div className='mainlogindiv'>
            <h1>Sign in</h1>
            <label htmlFor=''>Mobile Number</label> <br />
            <input
              placeholder='Enter Mobile Number'
              type='number'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <br />
            <label htmlFor=''>Enter Password</label>
            <br />
            <input
              placeholder='Enter Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div>
              <br />
              <button className='btn' onClick={handleLogin}>
                Continue
              </button>
            </div>
            <br />
            <button onClick={newAccount} className='btn2'>
              Create your account
            </button>
            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
};
