import React, { useState, useEffect } from 'react';
import '../Styles/products.css';

export const Allshops = () => {
  const [shops, setShops] = useState([]);

  // Assuming you have a function to fetch the data from the API
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
      <h1>Products</h1>
      <div className="product-list">
        {shops.map((shop) => (
          <div key={shop._id} className="product-card">
            <h2>{shop.title}</h2>
            <p>Loaction : {shop.location}</p>
            <p>Description : {shop.description}</p>
            <p>Category: {shop.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
