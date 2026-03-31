import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkShortener from './LinkShortener';
import Redirector from './Redirector';
import Analytics from './Analytics'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LinkShortener />} />
        
        {/* Analytics route MUST go before the catch-all dynamic route */}
        <Route path="/analytics" element={<Analytics />} />
        
        {/* Dynamic route for redirects */}
        <Route path="/:shortId" element={<Redirector />} />
      </Routes>
    </Router>
  );
}

export default App;