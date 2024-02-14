import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../Styles/allshops.css';

const ShopDetailsMap = ({ shop }) => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(shop.location)}`);
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
  
        const data = await response.json();
        console.log('API Response:', data); // Log the API response
  
        if (data.length > 0) {
          setCoordinates({
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          });
        } else {
          console.error(`Could not get coordinates for shop ${shop.title}:`, shop.location);
        }
      } catch (error) {
        console.error(`Error fetching coordinates for shop ${shop.title}:`, error);
      }
    };
  
    // Cleanup function to check if component is still mounted
    let isMounted = true;
    fetchCoordinates();
  
    return () => {
      isMounted = false;
    };
  }, [shop.location, shop.title]);
  

  console.log(coordinates)

  return (
  
    <MapContainer
    center={[coordinates.latitude, coordinates.longitude]}
    zoom={13}
    style={{ height: '300px', width: '100%' }}
  >
    <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
    />
      <Marker position={[coordinates.latitude, coordinates.longitude]}>
        <Popup>
          <div>
            <h2>{shop.title}</h2>
            <p>Location: {shop.location}</p>
            <p>Description: {shop.description}</p>
            <p>Category: {shop.category}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

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
        console.error('Error fetching shops:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredShops = shops.filter(
    (shop) =>
      shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className='searchfun'>
        <label htmlFor="search">Search by Location or Shop:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Enter location or shop name..."
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

                 <video width="200px" controls src={shop.video_one}></video>
                 
               
              </div>
            </Link>
            {/* Render the ShopDetailsMap for each shop */}
            <ShopDetailsMap shop={shop} />
          </div>
        ))}
      </div>
    </div>
  );
};
