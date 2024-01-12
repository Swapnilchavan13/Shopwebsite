import React, { useEffect, useState } from 'react';
import '../Styles/payment.css';

export const Paymentpage = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [paymentOption, setPaymentOption] = useState(''); // New state for selected payment option

    useEffect(() => {
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const storedTotalCost = localStorage.getItem('totalCost') || 0;

        setSelectedProducts(storedSelectedProducts);
        setTotalCost(storedTotalCost);
    }, []);

    const handlePayment = () => {
        const paymentData = {
            uid: localStorage.getItem('uid'), // Assuming you have stored uid in local storage
            selectedProducts,
            totalCost,
            paymentOption, // Use the selected payment option
            paymentStatus: true,
        };

        // Make a POST request to your Express API
        fetch('http://localhost:3010/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setPaymentSuccessful(true);

        setTimeout(() => {
            window.location.href = '/allshops';
        }, 3000);
    };

    const closeModal = () => {
        setPaymentSuccessful(false);
        window.location.href = '/allshops';
    };

    return (
        <div className="mainpd">
            <h1>Payment Page</h1>
            <h2>Selected Advertising</h2>
            <div className='pdiv'>
                {selectedProducts.map((product, index) => (
                    <div className='pdiv2' key={index}>
                        <img width="200px" src={product.imageSrc} alt={`Advertising ${product.advertisingSpace}`} className="selected-product-image" />
                        <br />
                        Advertising {product.advertisingSpace}: {product.title} - ₹ {product.price}/- per month
                    </div>
                ))}
            </div>
            <p>Total Cost: ₹ {totalCost}/-</p>

            {!paymentSuccessful ? (
                <div>
                    <h2>Select Payment Option:</h2>
                    <div className="payment-options">
                        {/* Credit/Debit Card */}
                        <label>
                            <input type="radio" name="paymentOption" value="creditCard" onChange={() => setPaymentOption('creditCard')} checked={paymentOption === 'creditCard'} /> Credit/Debit Card
                        </label>

                        {/* Net Banking */}
                        <label>
                            <input type="radio" name="paymentOption" value="netBanking" onChange={() => setPaymentOption('netBanking')} checked={paymentOption === 'netBanking'} /> Net Banking
                        </label>

                        {/* UPI */}
                        <label>
                            <input type="radio" name="paymentOption" value="upi" onChange={() => setPaymentOption('upi')} checked={paymentOption === 'upi'} /> UPI
                        </label>
                    </div>

                    <button onClick={handlePayment} className="payment-button">
                        Make Payment
                    </button>
                </div>
            ) : (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Payment Successful!</h2>
                        <img src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-727.gif" alt="Successful Payment" width="200px" />
                    </div>
                </div>
            )}
        </div>
    );
};
