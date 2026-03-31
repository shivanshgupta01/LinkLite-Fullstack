import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Link as LinkIcon, Copy, CheckCircle, AlertCircle, BarChart3, Zap, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LinkShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [links, setLinks] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  // --- DARK MODE STATE ---
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    // Load links
    const savedLinks = JSON.parse(localStorage.getItem('linklite_urls')) || [];
    setLinks(savedLinks);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);
    setCurrentResult(null);

    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    try {
      // Using an environment variable for the API URL
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: longUrl, customAlias }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      const { shortUrl, data: dbData } = data;

      const newLinkHistory = {
        id: dbData._id,
        originalUrl: dbData.originalUrl,
        shortId: dbData.shortId,
        createdAt: dbData.createdAt,
        clicks: dbData.clicks,
      };

      const updatedLinks = [newLinkHistory, ...links];
      setLinks(updatedLinks);
      localStorage.setItem('linklite_urls', JSON.stringify(updatedLinks));

      // Build the full clickable URL using the current window location
      setCurrentResult(`${window.location.origin}/${shortUrl}`);
      setLongUrl('');
      setCustomAlias('');

    } catch (err) {
      console.error("Frontend fetch error:", err);
      setError('Failed to connect to the server. Is it running?');
    }
  };

  const handleCopy = () => {
    if (currentResult) {
      navigator.clipboard.writeText(currentResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    // Added dark mode background gradients
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <nav className="p-4 md:p-6 flex justify-end gap-4 max-w-7xl mx-auto">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
        </button>

        <Link 
          to="/analytics" 
          className="flex items-center px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-indigo-100 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          View Stats
        </Link>
      </nav>

      <div className="flex flex-col items-center justify-center px-4 pt-8 pb-24">
        <div className="max-w-xl w-full space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none mb-2">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Link<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Lite</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              The fastest way to clean up your messy links.
            </p>
          </div>

          {/* Main Input Card - Added dark backgrounds and borders */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-white/20 dark:border-gray-700 ring-1 ring-gray-900/5 dark:ring-white/5 transition-all duration-300">
            <form onSubmit={handleShorten} className="space-y-5">
              
              <div className="space-y-1.5">
                <label htmlFor="longUrl" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Original URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type="url"
                    id="longUrl"
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="https://example.com/your-very-long-link..."
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="customAlias" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Custom Alias <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span></label>
                <div className="flex rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all bg-gray-50 dark:bg-gray-900 overflow-hidden">
                  <span className="inline-flex items-center px-4 border-r border-gray-200 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 sm:text-sm font-medium">
                    linklite.com/
                  </span>
                  <input
                    type="text"
                    id="customAlias"
                    className="flex-1 block w-full min-w-0 px-4 py-4 bg-transparent border-none focus:ring-0 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="my-custom-link"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-md shadow-indigo-200 dark:shadow-none text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transform transition-all active:scale-[0.98]"
              >
                Shorten URL
              </button>
            </form>
          </div>

          {currentResult && (
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-indigo-100 dark:border-gray-700 animate-in zoom-in-95 duration-200">
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-3 ml-1 uppercase tracking-wider">🎉 Your link is ready!</p>
              <div className="flex items-center justify-between bg-indigo-50/50 dark:bg-gray-900 p-2 pl-4 rounded-2xl border border-indigo-100 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white font-medium truncate mr-4 text-lg">
                  {currentResult}
                </span>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all ${
                    copied 
                      ? 'bg-green-500 text-white shadow-md shadow-green-200 dark:shadow-none' 
                      : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 shadow-sm border border-indigo-200 dark:border-gray-600'
                  }`}
                >
                  {copied ? (
                    <><CheckCircle className="h-5 w-5 mr-2" /> Copied!</>
                  ) : (
                    <><Copy className="h-5 w-5 mr-2" /> Copy</>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}