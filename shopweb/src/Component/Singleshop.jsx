import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/singleshop.css';

export const Singleshop = () => {
    const navigate= useNavigate();
    const { id } = useParams();
    const [shopDetails, setShopDetails] = useState({});
    const [showFullImage, setShowFullImage] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);


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

    const handlePurchase = (advertisingSpace, price, imageSrc) => {
        const isAlreadySelected = selectedProducts.some((product) => product.advertisingSpace === advertisingSpace);

        if (!isAlreadySelected) {
            const title = shopDetails[`title${advertisingSpace}`];
            setSelectedProducts((prev) => [...prev, { advertisingSpace, price, imageSrc, title }]);
            setTotalCost((prev) => prev + +price);
            alert(`You have Selected Advertising ${advertisingSpace}`);
        } else {
            alert(`Advertising ${advertisingSpace} is already selected.`);
        }
    };

    const toggleShowFullImage = (advertisingSpace) => {
        setShowFullImage((prev) => ({
            ...prev,
            [advertisingSpace]: !prev[advertisingSpace],
        }));
    };

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    const navigateToLocation = () => {
        const location = shopDetails.location;
        const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        window.location.href = googleMapsUrl;
    };

    const submitOrder = () => {
        localStorage.setItem('totalCost', totalCost);
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        navigate('/paymentpage');
    };
    
    

    const handleRemove = (advertisingSpace) => {
        setSelectedProducts((prev) => prev.filter((product) => product.advertisingSpace !== advertisingSpace));
        setTotalCost((prev) => prev - selectedProducts.find((product) => product.advertisingSpace === advertisingSpace).price);
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
                                    <button className='addbutton' onClick={() => handlePurchase(index + 1, shopDetails[`price${index + 1}`], shopDetails[`image_${el}`])}>
                                        Buy On Rent
                                    </button>
                                    <button className='addbutton' onClick={() => toggleShowFullImage(index + 1)}>
                                        {showFullImage[index + 1] ? 'Show Partial' : 'Show Full Image'}
                                    </button>
                                </div>
                            )
                        ))}
                    </div>

                    <div>
                        <h2>Selected Advertising</h2>
                        <div>
                            {selectedProducts.map((product, index) => (
                                <div id='selectedadd' key={index}>
                                    <img width="150px" src={product.imageSrc} alt={`Advertising ${product.advertisingSpace}`} className="selected-product-image" />
                                    <br />
                                    Advertising {product.advertisingSpace}: {product.title} - ₹ {product.price}/- per month
                                   <br />
                                    <button className='remove-button' onClick={() => handleRemove(product.advertisingSpace)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p>Total Cost: ₹ {totalCost}/-</p>
                        <button className='submit-button' onClick={submitOrder}>
                            Submit Order
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
