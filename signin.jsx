


import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for API requests
import './signin.css'; // Import styling for the Sign In page

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the sign-in request to the backend
      const response = await axios.post('http://localhost:5000/api/signin', formData);

      // Check if response is successful
      if (response.status === 200) {
        alert('Sign In successful!');
        // Redirect to homepage or dashboard
        window.location.href = '/';
      }
    } catch (error) {
      // Handle error (Invalid email or password)
      if (error.response && error.response.status === 400) {
        alert('Invalid email or password. Please try again.');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <section className="sign-in-section">
      <div className="sign-in-form-container">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-line"></div>

          <div className="form-group">
            <label htmlFor="forgotPassword">
              <a href="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </a>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
