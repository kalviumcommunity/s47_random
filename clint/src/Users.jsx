// Users.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './User.css'

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:2000/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    // Navigate to edit form with user ID
    navigate(`/users/edit`, { state: { user } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/users/${id}`);
      // After successful deletion, fetch updated user list
      const response = await axios.get('http://localhost:2000/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
<div className="container">
  <h1 className='user' >Users</h1>
  <ul>
    {users.map(user => (
      <li key={user._id}>
        <h3>ID: {user._id}</h3>
        <p><strong>Username:</strong> {user.username}, <strong>Email:</strong> {user.email}</p>
        <button onClick={() => handleEdit(user)}>Edit</button>
        <button onClick={() => handleDelete(user._id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>
  );
}

export default Users;
