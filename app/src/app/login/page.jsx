"use client";

import "./page.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter(); // Initialize useRouter

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignInMode) {
        // Login request
        response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
      } else {
        // Signup request
        response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Success!"); // Success toast

        if (isSignInMode) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        }

        // Redirect to dashboard
        router.push("/dashboard/views/home");
      } else {
        toast.error(data.message || "An unexpected error occurred"); // Error toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred"); // General error toast
    }
  };

  return (
    <div className={`container ${isSignInMode ? "" : "sign-up-mode"}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="forms-container">
        <div className="signin-signup">
          {isSignInMode && (
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
          )}
          {!isSignInMode && (
            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
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
          )}
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Enter your details and start your journey with us</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignInMode(false)}
            >
              Sign up
            </button>
          </div>
          <img src="/img/log.svg" className="image" alt="log" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>To keep connected with us please login with your personal info</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignInMode(true)}
            >
              Sign in
            </button>
          </div>
          <img src="/img/register.svg" className="image" alt="register" />
        </div>
      </div>
    </div>
  );
}

export default Login;
