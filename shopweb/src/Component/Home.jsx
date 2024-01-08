import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
    <h1>Hello Home Page</h1>
    <Link to="allshops">
    <h1>All Shops</h1>
    </Link>

    <Link to="addshops">
    <h1>Add Shop</h1>
    </Link>
    </>
  )
}
