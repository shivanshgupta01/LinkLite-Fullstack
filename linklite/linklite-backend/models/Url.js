import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  customAlias: {
    type: String,
    // It's optional, but if provided, we want to know what it was
    default: null, 
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  lastAccessed: {
    type: Date,
    default: null,
  }
}, { timestamps: true }); // This automatically adds 'createdAt' and 'updatedAt'

export default mongoose.model('Url', urlSchema);
