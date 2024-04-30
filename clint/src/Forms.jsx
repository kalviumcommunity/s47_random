import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Forms = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/add', formData);
      setFormData({
        username: '',
        email: '',
      });
      alert('User added successfully!');
      navigate('/users');

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input
          className="form-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button className="form-button" type="submit">
        Add User
      </button>
    </form>
  </div>
);
};

export default Forms;
