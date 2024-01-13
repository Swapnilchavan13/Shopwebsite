import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/userdetails.css';

export const UserData = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const usermobile = localStorage.getItem('usermobile');
    const uid = localStorage.getItem('uid');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://62.72.59.146:3010/allusers`);
                const data = await response.json();

                if (response.ok) {
                    // Find the user that matches both username and usernumber
                    const matchingUser = data.find(user => user._id === uid);

                    if (matchingUser) {
                        setUserData(matchingUser);
                    } else {
                        console.error('User not found');
                    }
                } else {
                    console.error('Error fetching user data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
            }
        };

        fetchData();
    }, [username, usermobile]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('isLoginSuccessful');
        localStorage.removeItem('cart');
        localStorage.removeItem('usermobile');
        localStorage.removeItem('uid');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="user-details-container">
            <h2 className="user-details-header">User Details</h2>
            {userData ? (
                <>
                    <h2>Name: {userData.username}</h2>
                    <h3>Mobile Number: {userData.usernumber}</h3>
                </>
            ) : (
                <p>Loading user data...</p>
            )}

            <div className='addallshop'>
                <Link to="/allshops">
                    <h4>All Shops</h4>
                </Link>

                <Link to="/addshops">
                    <h4>Add Shop</h4>
                </Link>

                <Link to="/myshops">
                    <h4>My Shop</h4>
                </Link>
            </div>

            <br />
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};
