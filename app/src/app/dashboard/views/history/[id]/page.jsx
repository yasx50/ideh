"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const HistoryPage = () => {
  const { id } = useParams();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatText = (text) => {
    // Replace newlines and markdown-like syntax for clean rendering
    if(!text) return
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
      .replace(/\n/g, "<br />"); // Line breaks
  };

  useEffect(() => {
    if (!id) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/history/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch history for id: ${id}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(data.history);
        console.log(data.history.length);
        
        if (!data.history || data.history.length === 0) {
          throw new Error(`No history found for id: ${id}`);
        }

        setHistory(data.history); // Assume the first item in the array
      } catch (error) {
        setError(error.message);
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        Loading history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!history) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        No history found for this item.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Sidebar is already fixed */}
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        History for Item {history.id}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Prompt:</h2>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: formatText(history.promptText) }}
        ></div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Generated Output:</h2>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: formatText(history.generatedOutput.final_result),
          }}
        ></div>
        <div className="mt-4 text-sm text-gray-500">
          Created At: {new Date(history.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  </div>
  );
};

export default HistoryPage;
