import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/singleshop.css';

export const Singleshop = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [shopDetails, setShopDetails] = useState({});
    const [showFullImage, setShowFullImage] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const response = await fetch(`http://62.72.59.146:3010/allshops/${id}`);
                const data = await response.json();
                setShopDetails(data);

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

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await fetch('http://62.72.59.146:3010/orders');
                const data = await response.json();
                setOrdersData(data);
            } catch (error) {
                console.error('Error fetching orders data:', error);
            }
        };

        fetchOrdersData();
    }, []);

    const isMatchedWithOrder = (selectedProduct) => {
        return ordersData.some((order) => {
            return order.selectedProducts.some((product) => {
                return (
                    product.advertisingSpace === selectedProduct.advertisingSpace &&
                    product.price === selectedProduct.price &&
                    product.imageSrc === selectedProduct.imageSrc &&
                    product.title === selectedProduct.title
                );
            });
        });
    };

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

    const navigateToLocation = () => {
        const location = shopDetails.location;
        const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        window.location.href = googleMapsUrl;
    };

    const submitOrder = () => {
        if (selectedProducts.length === 0) {
            alert('Please select at least one product before proceeding to payment.');

        } else {
            localStorage.setItem('totalCost', totalCost);
            localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            navigate('/paymentpage');
        }
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
                                <div key={index} className={isMatchedWithOrder({ advertisingSpace: index + 1, price: shopDetails[`price${index + 1}`], imageSrc: shopDetails[`image_${el}`], title: shopDetails[`title${index + 1}`] }) ? 'matched-product' : ''}>
                                    {isMatchedWithOrder({ advertisingSpace: index + 1, price: shopDetails[`price${index + 1}`], imageSrc: shopDetails[`image_${el}`], title: shopDetails[`title${index + 1}`] }) ? (
                                        <>
                                            <h2>Advertising {index + 1}</h2>
                                            <img
                                                src={shopDetails[`image_${el}`]}
                                                alt=""
                                                className={showFullImage[index + 1] ? 'full-image' : 'partial-image'}
                                            />
                                            <h2>Advertising Space: {shopDetails[`title${index + 1}`]}</h2>
                                            <h4>Advertising Cost: ₹ {shopDetails[`price${index + 1}`]}/- per month</h4>
                                            <img className='sold' src="https://media4.giphy.com/media/eicx4WK1uiP1rQfmPd/giphy.gif" alt="" />
                                        </>
                                    ) : (
                                        <>
                                            <h2>Advertising {index + 1}</h2>
                                            <img
                                                src={shopDetails[`image_${el}`]}
                                                alt=""
                                                className={showFullImage[index + 1] ? 'full-image' : 'partial-image'}
                                            />
                                            <h2>Advertising Space: {shopDetails[`title${index + 1}`]}</h2>
                                            <h4>Advertising Cost: ₹ {shopDetails[`price${index + 1}`]}/- per month</h4>
                                            <button className='addbutton' onClick={() => handlePurchase(index + 1, shopDetails[`price${index + 1}`], shopDetails[`image_${el}`])} disabled={isMatchedWithOrder({ advertisingSpace: index + 1, price: shopDetails[`price${index + 1}`], imageSrc: shopDetails[`image_${el}`], title: shopDetails[`title${index + 1}`] })}>
                                                Buy On Rent
                                            </button>
                                            <button className='addbutton' onClick={() => toggleShowFullImage(index + 1)} disabled={isMatchedWithOrder({ advertisingSpace: index + 1, price: shopDetails[`price${index + 1}`], imageSrc: shopDetails[`image_${el}`], title: shopDetails[`title${index + 1}`] })}>
                                                {showFullImage[index + 1] ? 'Show Partial' : 'Show Full Image'}
                                            </button>
                                        </>
                                    )}
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
                                    <button className='can' onClick={() => handleRemove(product.advertisingSpace)}>
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
