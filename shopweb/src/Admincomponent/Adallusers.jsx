import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username}, 
            <strong> Number:</strong> {user.usernumber}, 
            <strong> Password:</strong> {user.userpassword}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
