import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/orders.css'; // Import the CSS file

export const Adallorders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://62.72.59.146:3010/orders');
        const data = await response.json();

        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);



  const handleCancelOrder = async (orderId) => {
    try {
      await fetch(`http://62.72.59.146:3010/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Remove the canceled order from the state
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div className="order-container">
      <h1>All Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="order-table-container">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total Cost</th>
                  <th>Payment Option</th>
                  <th>Payment Status</th>
                  <th>Selected Products</th>
                  <th>Action</th> {/* New column for Cancel button */}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.date}</td>
                    <td>₹{order.totalCost}/-</td>
                    <td>{order.paymentOption}</td>
                    <td>{order.paymentStatus ? 'Successful' : 'Pending'}</td>
                    <td>
                      <ul>
                        {order.selectedProducts.map((product, index) => (
                          <li key={index}>
                            <p>
                              Advertising {product.advertisingSpace}: {product.title} - ₹ {product.price}/- per month
                            </p>
                            <img
                              className="product-image"
                              src={product.imageSrc}
                              alt={`Advertising ${product.advertisingSpace}`}
                            />
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button className='can' onClick={() => handleCancelOrder(order._id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
