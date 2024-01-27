import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Addnavbar } from './Addnavbar';

export const Adshops = () => {
  const [userShops, setUserShops] = useState([]);
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    const fetchUserShops = async () => {
      try {
        const response = await fetch('http://62.72.59.146:3010/allshops');
        const allShops = await response.json();

        console.log(allShops)
        if (response.ok) {
          // Filter shops based on the UID
          const shopsForUser = allShops.filter((shop) => shop.uid === 'adminupload');
          setUserShops(shopsForUser);
        } else {
          console.error('Error fetching user shops:', allShops.message);
        }
      } catch (error) {
        console.error('Error fetching user shops:', error);
      }
    };

    fetchUserShops();
  }, [uid]);

  return (
    <>
    <Addnavbar />
    <div className="products-container">
      <h1>My Shops And Stores</h1>
      <div className="product-list">
        {userShops.map((shop) => (
          <Link to={`/allshops/${shop._id}`} key={shop._id} className="product-card">
            <img src={shop.image_one} alt="" />
            <div>
              <h2>{shop.title}</h2>
              <p>Location: {shop.location}</p>
              <p>Description: {shop.description}</p>
              <p>Category: {shop.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};
