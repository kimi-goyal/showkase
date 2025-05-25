import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'artist', 'admin'], default: 'user' },

  // Artist-specific fields (only filled if role = 'artist')
  bio: String,
  category: String,      // e.g., Drummer, Painter
  profilePic: String,
  socialLinks: [String],
  location: String,
  isArtistProfileComplete: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User; 