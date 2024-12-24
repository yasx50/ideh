"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const HistoryPage = () => {
    const { id } = useParams();
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatText = (text) => {
        if (!text) return;
        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
                Welcome to Scrape&ScatterGPT!
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
                A cutting-edge tool designed to assist you with web scraping and data interaction.
                Effortlessly collect, analyze, and chat with your data to gain valuable insights.
            </p>
            <div className="flex flex-col items-center">
                <p className="text-gray-500 mb-2 italic">
                    Ready to start your scraping journey?
                </p>

            </div>
        </div>
    );
};

export default HistoryPage;
