import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter to access query params

const HistoryPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the 'id' from the query parameters
  const [historyItem, setHistoryItem] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchHistoryItem = async () => {
        try {
          const response = await fetch(`/api/history/${id}`);
          const data = await response.json();

          if (response.ok) {
            setHistoryItem(data); // Store the history item
          } else {
            console.error("Failed to fetch the history item");
          }
        } catch (error) {
          console.error("Error fetching the history item:", error);
        }
      };

      fetchHistoryItem();
    }
  }, [id]); // Run the effect when the id is available

  if (!historyItem) return <div>Loading...</div>; // Show loading state if the item is still being fetched

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">History Details</h3>
      <div className="mb-4">
        <strong>URL:</strong> <span>{historyItem.url}</span>
      </div>
      <div className="mb-4">
        <strong>Created At:</strong> <span>{new Date(historyItem.createdAt).toLocaleString()}</span>
      </div>
      <div>
        <strong>Output:</strong>
        <p>{historyItem.generatedOutput.final_result}</p>
      </div>
    </div>
  );
};

export default HistoryPage;
