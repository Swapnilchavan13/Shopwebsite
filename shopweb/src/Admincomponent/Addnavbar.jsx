import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/addnavbar.css'

export const Addnavbar = () => {
  return (
    <div className='adnav'>
      <Link to='/adaddshops'>
      <h2>Add Shop</h2>
      </Link>
      <Link to='/adallorders'>
      <h2>All Orders</h2>
      </Link>
      <Link to='/adallshops'>
      <h2>All Shop</h2>
      </Link>
    </div>
  )
}
