import React, { useEffect, useState } from "react";

const MoodQuoteNinja = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_APP_NINJA_API_KEY;


  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": apiKey, 
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); 
      if (data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } else {
        throw new Error("No quote found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-indigo-100 to-indigo-300">
      <h2 className="text-lg font-bold mb-2">Mood Quote of the Day</h2>
      {loading ? (
        <p className="text-sm text-gray-600 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">Error: {error}</p>
      ) : (
        <div className="bg-white p-4 rounded shadow-inner">
          <p className="italic text-gray-800">“{quote}”</p>
          <p className="text-right mt-2 text-sm font-medium text-gray-700">
            — {author}
          </p>
        </div>
      )}
      <button
        onClick={fetchQuote}
        className="mt-4 text-purple-700 hover:underline text-sm"
      >
        🔁 Refresh Quote
      </button>
    </div>
  );
};

export default MoodQuoteNinja;
