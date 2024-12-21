"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const UserHomePage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    background: darkMode ? "#000000" : "#F4F4F9",
    text: darkMode ? "#E0E0E0" : "#1B263B",
    accent: darkMode ? "#1DB954" : "#0096C7",
    secondaryAccent: darkMode ? "#FF4081" : "#FF6F61",
    inputBg: darkMode ? "#121212" : "#FFFFFF",
    border: darkMode ? "#1DB954" : "#0096C7",
  };

  return (
    <motion.main
      className="w-full p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ color: theme.accent }}>
          Welcome to Our Beta v1
        </h1>
        <button
          onClick={toggleTheme}
          className="flex items-center px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: theme.accent, color: theme.inputBg }}
        >
          {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </button>
      </header>

      <section className="mb-8">
        <p className="text-lg mb-4" style={{ color: theme.text }}>
          We're thrilled to present our Beta v1—a cutting-edge tool for web scraping. This version is designed to help you collect the data you need seamlessly and efficiently.
        </p>
        <p className="text-lg" style={{ color: theme.text }}>
          Start exploring today, and help us make this the best tool for data extraction!
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: theme.text }}>
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
            className="px-6 py-3 rounded-lg text-lg"
            style={{
              backgroundColor: theme.accent,
              color: theme.inputBg,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Scrape Now
          </motion.button>
          <motion.button
            type="submit"
            className="px-6 py-3 ml-4 rounded-lg text-lg"
            style={{
              backgroundColor: theme.secondaryAccent,
              color: theme.inputBg,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Download Response
          </motion.button>
        </form>
      </section>
    </motion.main>
  );
};

export default UserHomePage;
