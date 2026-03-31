import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ExternalLink, Calendar, MousePointerClick, ArrowLeft, Activity, Sun, Moon } from 'lucide-react';

export default function Analytics() {
  const [links, setLinks] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Bulletproof Theme Check on Load
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // 2. Load Links
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

  return (
    // Dark mode gradients added here!
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans text-gray-900 dark:text-white pb-24 transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <nav className="p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Generator
        </Link>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-10">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Link Analytics
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Track the performance of your shortened URLs.</p>
          </div>
        </div>

        {/* Stats List */}
        {links.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-12 text-center rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-white/20 dark:border-gray-700 ring-1 ring-gray-900/5 dark:ring-white/5 transition-all">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No links generated yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first shortened link to start tracking stats.</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 rounded-2xl shadow-md shadow-indigo-200 dark:shadow-none text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all"
            >
              Create LinkLite
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {links.map((link) => (
              <div key={link.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-white/20 dark:border-gray-700 ring-1 ring-gray-900/5 dark:ring-white/5 hover:shadow-2xl hover:shadow-indigo-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Link Info */}
                  <div className="overflow-hidden flex-1">
                    <a 
                      href={`/${link.shortId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 hover:opacity-80 flex items-center mb-2 w-fit transition-opacity"
                    >
                      linklite.com/{link.shortId}
                      <ExternalLink className="h-5 w-5 ml-2 text-indigo-400 dark:text-indigo-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400 truncate max-w-xl" title={link.originalUrl}>
                      {link.originalUrl}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-gray-900/50 px-6 py-4 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 flex-shrink-0 transition-colors">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl mr-3">
                        <MousePointerClick className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Clicks</p>
                        <p className="font-extrabold text-xl leading-none mt-1 text-gray-900 dark:text-white">{link.clicks || 0}</p>
                      </div>
                    </div>
                    
                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-700 mx-2"></div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl mr-3">
                        <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Last Visited</p>
                        <p className="font-semibold text-sm leading-none mt-1 text-gray-900 dark:text-white">
                          {link.lastAccessed ? new Date(link.lastAccessed).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}