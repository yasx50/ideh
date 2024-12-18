"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const UserHomePage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const darkTheme = {
    background: "#0D1B2A",
    text: "#E0E1DD",
    accent: "#00B4D8",
    secondaryAccent: "#FF6F61",
    inputBg: "#1B263B",
    border: "#00B4D8",
  };

  const lightTheme = {
    background: "#F4F4F9",
    text: "#1B263B",
    accent: "#0096C7",
    secondaryAccent: "#FF6F61",
    inputBg: "#FFFFFF",
    border: "#0096C7",
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <motion.div
      className="min-h-screen font-sans"
      style={{ backgroundColor: theme.background, color: theme.text }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Navbar */}
      <motion.nav
        className="p-4 shadow-lg"
        style={{ backgroundColor: darkMode ? "#16213E" : "#E0E1DD" }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-xl font-bold"
            style={{ color: theme.accent }}
          >
            Oxylabs
          </h1>
          <div className="flex items-center space-x-6">
            <span
              className="text-gray-300"
              style={{ color: darkMode ? theme.text : "#1B263B" }}
            >
              Hello, User123
            </span>
            {/* <button
              className="px-4 py-2 rounded-lg"
              style={{
                backgroundColor: theme.secondaryAccent,
                color: theme.inputBg,
              }}
            >a
              Logout
            </button> */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: theme.accent,
                color: theme.inputBg,
              }}
            >
              {darkMode ? (
                <>
                  <FaSun className="text-lg" />
                  
                </>
              ) : (
                <>
                  <FaMoon className="text-lg" />
                 
                </>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Section */}
      <header className="py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Left Section: Text */}
          <motion.div
            className="w-full md:w-1/2 text-left md:pr-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{ color: theme.accent }}
            >
              Welcome to Our Beta v1
            </h1>
            <p className="text-lg mt-4" style={{ color: theme.text }}>
              We're thrilled to present our Beta v1—a cutting-edge tool for web
              scraping. This version is designed to help you collect the data
              you need seamlessly and efficiently.
            </p>
            <p className="text-lg mt-2" style={{ color: theme.text }}>
              Whether you're a researcher, business analyst, or developer, this
              platform is built to adapt to your needs. Your feedback is vital
              to us as we shape the future of our product.
            </p>
            <p
              className="text-lg mt-2 font-medium"
              style={{ color: theme.secondaryAccent }}
            >
              Start exploring today, and help us make this the best tool for
              data extraction!
            </p>
          </motion.div>

          {/* Right Section: Input Form */}
          <motion.div
            className="w-full md:w-1/2 p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: theme.inputBg }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: theme.text }}
            >
              Start Your Scraping Journey
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text }}
                >
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-lg focus:ring focus:outline-none"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    border: `2px solid ${theme.border}`,
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text }}
                >
                  What do you want to scrape?
                </label>
                <textarea
                  id="prompt"
                  placeholder="Enter your requirements here..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg focus:ring focus:outline-none"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    border: `2px solid ${theme.border}`,
                  }}
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full px-6 py-3 rounded-lg text-lg"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.inputBg,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Scrape Now
              </motion.button>
            </form>
          </motion.div>
        </div>
      </header>

      {/* Footer */}
      <motion.footer
        className="py-8"
        style={{ backgroundColor: theme.inputBg, color: theme.text }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Oxylabs. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="#"
              className="hover:underline"
              style={{ color: theme.accent }}
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:underline"
              style={{ color: theme.accent }}
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:underline"
              style={{ color: theme.accent }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default UserHomePage;
