import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/login', formData);
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:2000/logout');
      console.log(response.data);
      setIsLoggedIn(false);
      setFormData({
        username: '',
        email: '',
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div>
          <h1 className="welcome-message">Welcome, {formData.username}!</h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="login-input">
              <label className="login-label" htmlFor="username">Username:</label>
              <input
                className="login-input-field"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                id="username"
              />
            </div>
            <div className="login-input">
              <label className="login-label" htmlFor="email">Email:</label>
              <input
                className="login-input-field"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
              />
            </div>
            <button className="login-button" type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
