import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';

// Import our Database Model
import Url from './models/Url.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// This allows any frontend domain to talk to your API
app.use(cors());
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- API ROUTES ---

// 1. Create a Short Link
app.post('/shorten', async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    // Check if URL is provided
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    let shortId;

    // Handle Custom Alias Logic
    if (customAlias && customAlias.trim() !== '') {
      // Check if alias is already taken in the database
      const existing = await Url.findOne({ shortId: customAlias });
      if (existing) {
        return res.status(400).json({ error: 'That custom alias is already taken.' });
      }
      shortId = customAlias.trim();
    } else {
      // Generate a random 6-character ID
      shortId = nanoid(6);
    }

    // Create the new URL document
    const newUrl = new Url({
      originalUrl,
      shortId,
      customAlias: customAlias || null,
    });

    // Save it to MongoDB Cloud!
    await newUrl.save();

    // Send success response back to the frontend
    res.status(201).json({
      message: 'Link shortened successfully!',
      shortUrl: `${shortId}`, // We will change this to the real domain later
      data: newUrl
    });

  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// 2. Handle Redirects & Analytics
app.get('/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find the link in the database
    const urlDoc = await Url.findOne({ shortId });

    // If it doesn't exist, return a 404 error
    if (!urlDoc) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Update the analytics!
    urlDoc.clicks += 1;
    urlDoc.lastAccessed = new Date();
    
    // Save the updated stats to the database
    await urlDoc.save();

    // Send the original URL back to our React frontend so it can redirect the user
    res.json({ originalUrl: urlDoc.originalUrl });

  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});