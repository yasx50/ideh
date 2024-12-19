// App.jsx
'use client'
import React, { useState } from "react";

const UserHistory = () => {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  const handleScrape = () => {
    if (url && query) {
      setHistory([...history, { url, query }]);
      setUrl("");
      setQuery("");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-800 p-4">
        <h2 className="text-2xl font-bold mb-4 border-b border-blue-400 pb-2">History</h2>
        <ul className="space-y-2">
          {history.length ? (
            history.map((item, index) => (
              <li key={index} className="text-sm border-b border-blue-600 pb-1">
                <p>
                  <span className="font-semibold">URL:</span> {item.url}
                </p>
                <p>
                  <span className="font-semibold">Query:</span> {item.query}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No history yet.</p>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Web Scraping Tool</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="url">
              Website URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="query">
              What to Scrap
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter what you want to scrape"
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleScrape}
            className="mt-4 px-6 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Scrape
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
