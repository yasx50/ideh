"use client"
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";  // Import useRouter for navigation
import { ThemeContext } from "@/app/dashboard/views/layout";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const router = useRouter();  // Initialize router

  const theme = {
    background: darkMode ? "#121212" : "#E0E1DD",
    text: darkMode ? "#E0E0E0" : "#1B263B",
    accent: darkMode ? "#1DB954" : "#0096C7",
    inputBg: darkMode ? "#1B1B1B" : "#FFFFFF",
    border: darkMode ? "#333333" : "#CCCCCC",
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const url = "/api/history";  // You can adjust the URL based on whether you're fetching specific histories or all
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data.histories);  // Assuming the response structure has 'histories'
      } catch (error) {
        console.error("Error fetching user history:", error);
        toast.error("Error Fetching User History");
      }
    };

    fetchHistory();
  }, []);

  const handleHistoryClick = (id) => {
    router.push(`/dashboard/views/history/${id}`);  // Navigate to the specific history page
    // setIsOpen(false);  // Optional: Close the sidebar when a history item is clicked
  };

  return (
    <>
    <div className="">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 rounded-md bg-gray-800 text-white z-20 lg:hidden"
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static bg-gray-800 text-white w-80 shadow-lg transition-transform duration-300 z-20`}
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex flex-col items-center p-6 ">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="rounded-full mb-4 border-4"
            style={{ borderColor: theme.accent }}
          />
          <h2 className="text-lg font-semibold mb-4" style={{ color: theme.accent }}>
            User123
          </h2>

          <div className="w-full text-left">
            <h3 className="text-lg font-medium mb-3" style={{ color: theme.text }}>
              History
            </h3>
            <ul>
              {history.length > 0
                ? history.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleHistoryClick(item.id)}  // Handle the click event
                    className="mb-2 rounded-md p-2 transition-all hover:bg-opacity-75 flex items-center justify-center"
                    style={{
                      color: theme.text,
                      backgroundColor: theme.inputBg,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <div>
                      {/* Display a part of the generated output */}
                      {item.generatedOutput?.final_result?.substring(19, 40) || "No output available"}
                    </div>
                  </li>
                ))
                : <li style={{ color: theme.text }}>No history available</li>}
            </ul>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
    </>
  );
};

export default Sidebar;
