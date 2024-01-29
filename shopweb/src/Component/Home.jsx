import React from 'react';
import { Link } from 'react-router-dom';
import { Allshops } from './Allshops';

export const Home = () => {
  const isloggedin = localStorage.getItem('isLoginSuccessful') || false;

  return (
    <>
      {/* {isloggedin ? (
        <Link to="addshops">
          <h1>Add Shop</h1>
        </Link>
      ) : (
        <Link to="login">
          <h1>Login to Add Shop</h1>
        </Link>
      )} */}
      <Allshops />
    </>
  );
};
