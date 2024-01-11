import React, { useEffect, useState } from 'react';
import '../Styles/payment.css'; // Add your CSS file for Paymentpage styling

export const Paymentpage = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    useEffect(() => {
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const storedTotalCost = localStorage.getItem('totalCost') || 0;

        setSelectedProducts(storedSelectedProducts);
        setTotalCost(storedTotalCost);
    }, []);

    const handlePayment = () => {
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
    <div>
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
                        <input type="radio" name="paymentOption" value="creditCard" /> Credit/Debit Card
                    </label>

                    {/* Net Banking */}
                    <label>
                        <input type="radio" name="paymentOption" value="netBanking" /> Net Banking
                    </label>

                    {/* UPI */}
                    <label>
                        <input type="radio" name="paymentOption" value="upi" /> UPI
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
) 
        }
