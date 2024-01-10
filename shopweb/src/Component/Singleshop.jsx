import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/singleshop.css';

export const Singleshop = () => {
    const { id } = useParams();
    const [shopDetails, setShopDetails] = useState({});
    const [showFullImage, setShowFullImage] = useState({});

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3010/allshops/${id}`);
                const data = await response.json();
                setShopDetails(data);

                // Initialize showFullImage state for each image
                const initialShowFullImage = {};
                ["one", "two", "three", "four", "five"].forEach((el, index) => {
                    initialShowFullImage[index + 1] = false;
                });
                setShowFullImage(initialShowFullImage);
            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        };

        fetchShopDetails();
    }, [id]);

    const handlePurchase = (advertisingSpace) => {
        // Implement the logic for purchasing the advertising space
        alert(`You have purchased Advertising ${advertisingSpace}`);
    };

    const toggleShowFullImage = (advertisingSpace) => {
        setShowFullImage((prev) => ({
            ...prev,
            [advertisingSpace]: !prev[advertisingSpace],
        }));
    };

    const navigateToLocation = () => {
        // Assuming shopDetails.location contains the latitude and longitude information
        // You can replace this with the actual logic based on your data structure
        const location = shopDetails.location;
        const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        window.location.href = googleMapsUrl;
    };

    return (
        <div className="single-shop-container">
            <h1>Single Shop Details</h1>
            {Object.keys(shopDetails).length > 0 ? (
                <>
                    <div>
                        <h2>{shopDetails.title}</h2>
                        <p onClick={navigateToLocation}>Location: {shopDetails.location}</p>
                        <p>Description: {shopDetails.description}</p>
                        <p>Category: {shopDetails.category}</p>
                    </div>

                    <div>
                        {["one", "two", "three", "four", "five"].map((el, index) => (
                            shopDetails[`image_${el}`] !== null && (
                                <div key={index}>
                                    <h2>Advertising {index + 1}</h2>
                                    <img
                                        src={shopDetails[`image_${el}`]}
                                        alt=""
                                        className={showFullImage[index + 1] ? 'full-image' : 'partial-image'}
                                    />
                                    <h2>Advertising Space: {shopDetails[`title${index + 1}`]}</h2>
                                    <h4>Advertising Cost: ₹ {shopDetails[`price${index + 1}`]}/- per month</h4>
                                    <button className='addbutton' onClick={() => handlePurchase(index + 1)}>
                                        Buy Advertising {index + 1}
                                    </button>
                                    <button className='addbutton' onClick={() => toggleShowFullImage(index + 1)}>
                                        {showFullImage[index + 1] ? 'Show Partial' : 'Show Full Image'}
                                    </button>
                                </div>
                            )
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
