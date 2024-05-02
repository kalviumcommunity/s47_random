
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditForm.css';

function EditForm() {
  const [editedUser, setEditedUser] = useState({
    username: '',
    email: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract user data from location state
    const user = location.state?.user;
    if (user) {
      setEditedUser(user);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2000/users/${editedUser._id}`, editedUser);
      // Navigate to users list after update
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
<form onSubmit={handleSubmit} className="form">
  <input type="text" name="username" value={editedUser.username} onChange={handleChange} />
  <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
  <button type="submit">Save</button>
</form>
  );
}

export default EditForm;
