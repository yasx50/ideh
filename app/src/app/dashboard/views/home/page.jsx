"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import Loader from "@/app/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { Toast } from "react-bootstrap";
import toast from "react-hot-toast";
const UserHomePage = () => {
  const router = new useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const theme = {
    background: darkMode ? "#000000" : "#F4F4F9",
    text: darkMode ? "#E0E0E0" : "#1B263B",
    accent: darkMode ? "#1DB954" : "#0096C7",
    secondaryAccent: darkMode ? "#FF4081" : "#FF6F61",
    inputBg: darkMode ? "#121212" : "#FFFFFF",
    border: darkMode ? "#1DB954" : "#0096C7",
  };

  const [loading, setLoading] = useState(null)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const scrapeData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log(formData);
      const response = await fetch('/api/history', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      console.log("POST Data",response.data);
      
      if (response.ok) {
        setLoading(false);
        router.push(`/dashboard/views/history`);
      }
      else {
        toast.error("The URL you entered Cannot be Scraped / Try Later")
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error Scraping Data:", error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <>

      {loading && <Loader />}
      {
        !loading &&
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
              We are thrilled to present our Beta v1—a cutting-edge tool for web scraping. This version is designed to help you collect the data you need seamlessly and efficiently.
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
                  value={formData.url}
                  onChange={handleInputChange}
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
                  value={formData.prompt}
                  onChange={handleInputChange}
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
                onClick={scrapeData}
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

      }
    </>
  );
};

export default UserHomePage;
