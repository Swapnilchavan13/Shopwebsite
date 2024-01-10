// AllShops.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/allshops.css';

export const Allshops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3010/allshops');
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="products-container">
      <h1>Shops And Stores</h1>
      <div className="product-list">
        {shops.map((shop) => (
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
  );
};
