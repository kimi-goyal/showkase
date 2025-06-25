import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema]
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
