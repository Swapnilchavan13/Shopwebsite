import React, { useState } from 'react';
import '../Styles/login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Validate mobile number
      if (!/^\d{10}$/.test(number)) {
        toast.error('Mobile number must be 10 digits', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const response = await fetch('http://62.72.59.146:3010/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          usernumber: number,
          userpassword: password,
        }),
      });
  
      const result = await response.json();
  
      // Check the result and show an alert if needed
      if (result.success) {
        toast.success(result.message, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
  
        // Optionally, you can navigate to another page after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(result.message, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div id='logindiv'>
      <ToastContainer />
      <br />

      <div className='mainlogindiv'>
        <h1>Create Account</h1>
        <label htmlFor=''>Your Name</label> <br />
        <input
          placeholder='Enter Your Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor=''>Mobile Number</label> <br />
        <input
          placeholder='Enter Mobile Number'
          type='number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
        <br />
        <button className='btn' onClick={handleRegister}>
          Create Account
        </button>
        <p onClick={() => navigate('/login')}>
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
};
