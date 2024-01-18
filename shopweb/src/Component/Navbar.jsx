import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css';

export const Navbar = ({ searchInput, onInputChange }) => {

    const username = localStorage.getItem('username') || "Login";

    const isloggedin = localStorage.getItem('isLoginSuccessful') || false;



    const handleSearch = () => {
        window.location.reload();
    };

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         handleSearch();
    //     }
    // };

  return (
    <div className='maindiv'>
        <Link to="/">
        <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/122305813/original/a091d109740ab886828d56f5959dcc0eae571176/professional-shopping-logo-design.jpg" alt="" />
        </Link>

        {/* <div id='searchdiv'>
        <input
          placeholder='Search Greyowl.in'
          type="text"
          list="types-list"
          value={searchInput}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>🔍</button>
      </div> */}

{isloggedin ? (
        <Link to="addshops">
          <h3>Add Shop</h3>
        </Link>
      ) : (
        <Link to="login">
          <h3>Login to Add Shop</h3>
        </Link>
      )}
        <Link to="allshops">
        <h3>All Shops</h3>
        </Link>
        <Link to="login">
        <h3>{username}</h3>
        </Link>
        <Link to="order">
        <h3>My Orders</h3>
        </Link>
    </div>
  )
}
