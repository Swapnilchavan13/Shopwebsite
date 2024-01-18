import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/addnavbar.css'

export const Addnavbar = () => {
  return (
    <div className='adnav'>
      <Link to='/adaddshops'>
      <h3>Add Shop</h3>
      </Link>
      <Link to='/adallorders'>
      <h3>All Orders</h3>
      </Link>
      <Link to='/adallshops'>
      <h3>All Shop</h3>
      </Link>
    </div>
  )
}
