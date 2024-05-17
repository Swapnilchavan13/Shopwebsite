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
      setShops(data.reverse());
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
    shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Addnavbar />
      <div className="products-container">
        <div className='searchfun'>
          <label htmlFor="search">Search by Location or Shop Name:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Enter location or shop name..."
          />
        </div>
        <h1>Shops And Stores -{filteredShops.length}</h1>

        <div className="product-list1">
          
          {filteredShops.map((shop) => (
            <div key={shop._id} className="product-card">
              <div>
              <Link to={`/allshops/${shop._id}`} target="_blank">
                <img src={shop.image_one} alt="" />
              </Link>
                <div>
                  <h2>{shop.title}</h2>
                  <p>Owner Name: {shop.ownerName}</p>
                  <p>Contact No: {shop.phoneNo}</p>
                  <p>Location: {shop.location}</p>
                  <p>Description: {shop.description}</p>
                  <p>Category: {shop.category}</p>
                  <p>Daily Footfall: {shop.dailyFootfall}</p>
                  <p>Remark: {shop.remark}</p>
                  <video width="300px" controls src={shop.video_one}></video>
                  <button className='can' onClick={() => handleDelete(shop._id)}>Delete</button>

              </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
