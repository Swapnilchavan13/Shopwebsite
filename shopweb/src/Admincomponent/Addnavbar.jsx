import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/addnavbar.css'

export const Addnavbar = () => {
  return (
    <div className='adnav'>
      <Link to='/admin9049/adaddshops'>
      <h2>Add Shop</h2>
      </Link>
      <Link to='/admin9049/adallorders'>
      <h2>All Orders</h2>
      </Link>
      <Link to='/admin9049/adallshops'>
      <h2>All Shop</h2>
      </Link>
    </div>
  )
}
