import React, { useState, useEffect } from 'react';
import { Addnavbar } from './Addnavbar';
import '../Styles/addallusers.css';

export const Adallusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://62.72.59.146:3010/allusers')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDeleteUser = (userId) => {
    // Send a DELETE request to the API to delete the user
    fetch(`http://62.72.59.146:3010/allusers/${userId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Update the state after successful deletion
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <>
      <Addnavbar />
    <div className="user-list-container">
      <h2>User List</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Number:</strong> {user.usernumber}
            </div>
            <div>
              <strong>Password:</strong> {user.userpassword}
            </div>
            <button className='adbutton' onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};
