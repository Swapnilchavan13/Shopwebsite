import React, { useState } from 'react';
import '../Styles/addshops.css';

export const AddShops = () => {
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleAddShop = () => {
    const apiUrl = 'http://localhost:3010/addShop';

    const postData = {
      title: shopName,
      location: location,
      description: description,
      category: category
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        alert("Shop Data Added");

        window.location.reload(false);

      })
      .catch(error => {
        console.error('Fetch Error:', error);
      });
  };
  
    return (
      <div className="add-shops-container">
        <h2>Add Shops</h2>
        <form>
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="input-field"
          />
  
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
  
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
  
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          />
  
          <button type="button" onClick={handleAddShop} className="submit-button">
            Add Shop
          </button>
        </form>
      </div>
    );
  };
  