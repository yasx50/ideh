"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader/Loader";

function Login() {
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isSignInMode ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // setLoading(false);  // Stop loading

      if (response.ok) {
        toast.success(data.message || "Success!");
        if (isSignInMode) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        router.push("/dashboard/views/home");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something broke... try again!");
    }
  };

  return (
    <>
      {loading && <Loader />};  {/* Show Loader when loading is true */}
      {!loading &&
        <div className="h-screen w-full  flex items-center justify-center relative overflow-hidden">
          <ToastContainer position="top-right" autoClose={3000} />
          {/* Animated Background Circles */}
          <div className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-30 top-20 left-10 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-20 animate-pulse"></div>

          <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-xl w-[90%] max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-center animate-bounce">
              {isSignInMode ? "Welcome Back" : "Join the Squad"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isSignInMode && (
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 py-2 rounded-md text-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                {isSignInMode ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <button
              onClick={() => setIsSignInMode(!isSignInMode)}
              className="mt-6 text-sm text-gray-400 hover:text-pink-400 transition-colors"
            >
              {isSignInMode
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      }
    </>

  );
}

export default Login;
