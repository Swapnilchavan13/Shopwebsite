import React, { useEffect, useState } from 'react';
import '../Styles/payment.css';

export const Paymentpage = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [paymentOption, setPaymentOption] = useState('upi');
    const [date, setDateRange] = useState("");

    useEffect(() => {
      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 30);
  
      const formattedStartDate = currentDate.toLocaleDateString("de-DE");
      const formattedEndDate = endDate.toLocaleDateString("de-DE");
  
      // Construct the date range string
      const rangeString = `${formattedStartDate} - ${formattedEndDate}`;
  
      setDateRange(rangeString);
    }, []);  
    

    useEffect(() => {
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const storedTotalCost = localStorage.getItem('totalCost') || 0;

        setSelectedProducts(storedSelectedProducts);
        setTotalCost(storedTotalCost);
    }, []);

    const handlePayment = () => {
        const uid = localStorage.getItem('uid');
        if (!uid) {
            alert('Please login first.');
            window.location.href = '/login'; // Replace with your login page route
            return;
        }

        const paymentData = {
            uid,
            selectedProducts,
            totalCost,
            paymentOption,
            paymentStatus: true,
            date
        };

        fetch('http://62.72.59.146:3010/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then((response) => {
                if (response.ok) {
                    setPaymentSuccessful(true);
                    setTimeout(() => {
                        window.location.href = '/allshops';
                    }, 2500);
                } else {
                    alert('Space is already sold. Please choose different space.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
            <h4>Total Cost: ₹ {totalCost}/-</h4>

            {!paymentSuccessful ? (
                <div>
                    <h2>Select Payment Option:</h2>
                    <div className="payment-options">
                        <label>
                            <input type="radio" name="paymentOption" value="creditCard" onChange={() => setPaymentOption('creditCard')} checked={paymentOption === 'creditCard'} /> Credit/Debit Card
                        </label>

                        <label>
                            <input type="radio" name="paymentOption" value="netBanking" onChange={() => setPaymentOption('netBanking')} checked={paymentOption === 'netBanking'} /> Net Banking
                        </label>

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
