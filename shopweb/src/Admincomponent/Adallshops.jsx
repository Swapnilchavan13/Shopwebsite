import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/allshops.css';
import { Addnavbar } from './Addnavbar';

export const Adallshops = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://62.72.59.146:3010/allshops');
      const data = await response.json();
      setShops(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (shopId) => {
    try {
      await fetch(`http://62.72.59.146:3010/allshops/${shopId}`, {
        method: 'DELETE',
      });
      // Remove the deleted shop locally
      setShops((prevShops) => prevShops.filter((shop) => shop._id !== shopId));
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  const filteredShops = shops.filter((shop) =>
    shop.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-container">
        <Addnavbar />
      <div className='searchfun'>
        <label htmlFor="search">Search by Location:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Enter location..."
        />
      </div>
      <h1>Shops And Stores</h1>
     
      <div className="product-list">
        {filteredShops.map((shop) => (
          <div key={shop._id} className="product-card">
            <Link to={`/allshops/${shop._id}`}>
              <img src={shop.image_one} alt="" />
              <div>
                <h2>{shop.title}</h2>
                <p>Location: {shop.location}</p>
                <p>Description: {shop.description}</p>
                <p>Category: {shop.category}</p>
            <button onClick={() => handleDelete(shop._id)}>Delete</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
