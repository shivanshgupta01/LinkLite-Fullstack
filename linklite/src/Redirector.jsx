import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Redirector() {
  const { shortId } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        // 1. Ask the backend for the original URL
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/${shortId}`);
        const data = await response.json();

        if (response.ok && data.originalUrl) {
          // 2. If successful, instantly redirect the browser!
          window.location.href = data.originalUrl;
        } else {
          // 3. If the backend says "404", show our error page
          setNotFound(true);
        }
      } catch (err) {
        console.error("Redirect error:", err);
        setNotFound(true);
      }
    };

    fetchOriginalUrl();
  }, [shortId]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-xl shadow-indigo-100/50 border border-white/20 ring-1 ring-gray-900/5 max-w-md w-full">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h2>
          <p className="text-gray-500 mb-8">Oops! The link you clicked doesn't exist or may have been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl shadow-md shadow-indigo-200 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all"
          >
            Create a new LinkLite
          </Link>
        </div>
      </div>
    );
  }

  // Beautiful Loading State while we wait for the backend
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-center">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-ping w-16 h-16 rounded-full bg-indigo-400 opacity-20"></div>
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-indigo-600 font-bold tracking-widest uppercase text-sm animate-pulse">Redirecting...</p>
    </div>
  );
}