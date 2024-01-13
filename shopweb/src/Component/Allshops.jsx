import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/allshops.css';

export const Allshops = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://62.72.59.146:3010/allshops');
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter shops based on the search query
  const filteredShops = shops.filter((shop) =>
    shop.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-container">
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
