"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  // Use useParams from 'next/navigation'

const HistoryPage = () => {
  const { id } = useParams();  // Extract 'id' from the URL path params
  const [historyItem, setHistoryItem] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    if (!id) return; // Wait for 'id' to be available before making the API call

    const fetchHistory = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`/api/history/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistoryItem(data.history);
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchHistory();
  }, [id]); // Trigger this effect whenever 'id' changes

  if (loading) {
    return <div>Loading history...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!historyItem) {
    return <div>No history found for this item.</div>;
  }

  return (
    <div>
      <h1>History for Item {historyItem.id}</h1>
      {/* Render the history details */}
      <pre>{JSON.stringify(historyItem, null, 2)}</pre>
    </div>
  );
};

export default HistoryPage;
