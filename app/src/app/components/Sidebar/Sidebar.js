"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/app/dashboard/views/layout";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

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
        const url = "/api/history";
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data.histories);
      } catch (error) {
        console.error("Error fetching user history:", error);
        toast.error("Error Fetching User History");
      }
    };

    fetchHistory();
  }, []);

  const handleHistoryClick = (id) => {
    router.push(`/dashboard/views/history/${id}`);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "GET" });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <div>
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
          className={`sticky fixed top-0 left-0 h-[100dvh] transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static bg-gray-800 text-white w-96 shadow-lg transition-transform duration-300 z-20 h-auto`}
          style={{ backgroundColor: theme.background }}
        >
          <div className="relative flex justify-between items-center p-6">
            <button
              onClick={() => router.push("/dashboard/views/home")}
              className="absolute top-4 right-4 text-white bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition-all"
              style={{
                color: theme.text,
                backgroundColor: theme.accent,
              }}
            >
              Home
            </button>
          </div>

          <div className="flex flex-col items-center p-6">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="rounded-full mb-4 border-4"
              style={{ borderColor: theme.accent }}
            />
            <div className="relative w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-lg font-semibold mb-4 flex items-center justify-center w-full bg-gray-700 p-2 rounded-md"
                style={{ color: theme.accent }}
              >
                User123
                <svg
                  className={`w-5 h-5 ml-2 transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 bg-gray-700 text-white rounded-md shadow-lg w-full z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <div className="w-full text-left mt-6">
              <h3 className="text-lg font-medium mb-3" style={{ color: theme.text }}>
                History
              </h3>
              <div
                className="sidebar-history overflow-y-auto space-y-2"
                style={{
                  maxHeight: "calc(100vh - 200px)",
                  scrollbarWidth: "thin",
                  scrollbarColor: `${theme.accent} transparent`,
                }}
              >
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item.id)}
                      className="block w-full p-3 text-left rounded-md hover:bg-opacity-75"
                      style={{
                        color: theme.text,
                        backgroundColor: theme.inputBg,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      {item.generatedOutput?.final_result?.substring(19, 50) ||
                        "No output available"}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No history available</p>
                )}
              </div>
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
