"use client"
import './page.css';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignInMode) {
        // Login request
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        toast.success(response.data.msg); // Success toast
        localStorage.setItem('token', response.data.token); // Store token in local storage
      } else {
        // Signup request
        const response = await axios.post('http://localhost:5000/api/auth/register', formData);
        toast.success(response.data.msg); // Success toast
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage); // Error toast
    }
  };

  return (
    <div className={`container ${isSignInMode ? '' : 'sign-up-mode'}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-in Form */}
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>

          {/* Sign-up Form */}
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Enter your details and start your journey with us</p>
            <button className="btn transparent" onClick={() => setIsSignInMode(false)}>
              Sign up
            </button>
          </div>
          <img src="src/assets/img/log.svg" className="image" alt="log" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>To keep connected with us please login with your personal info</p>
            <button className="btn transparent" onClick={() => setIsSignInMode(true)}>
              Sign in
            </button>
          </div>
          <img src="src/assets/img/register.svg" className="image" alt="register" />
        </div>
      </div>
    </div>
  );
}

export default Login;
