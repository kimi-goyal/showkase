// src/pages/CreatePostPage.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const CreatePostPage = () => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'freelance_artist_preset'); // Cloudinary preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dyaadmeiy/upload`,
        formData
      );
      setMediaUrl(res.data.secure_url);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Media upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mediaUrl || !caption || !category || !mediaType) {
      alert('All fields are required!');
      console.warn("Missing fields", { mediaUrl, caption, category, mediaType });
      return;
    }

    try {
      //console.log("Sending post:", { mediaUrl, caption, category, mediaType });

      const res = await axiosInstance.post('/post/create', {
        mediaUrl,
        caption,
        category,
        mediaType,
      });

      console.log("Post created:", res.data);
      navigate('/'); // Redirect after success
    } catch (err) {
      console.error('Error creating post', err.response?.data || err.message);
      alert('Failed to create post. See console for details.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleMediaUpload} />
        {uploading && <p>Uploading...</p>}

        {mediaUrl && (
          mediaType === 'video' ? (
            <video src={mediaUrl} controls className="w-full h-64 object-cover" />
          ) : (
            <img src={mediaUrl} alt="Preview" className="w-full h-64 object-cover" />
          )
        )}

        <input
          type="text"
          placeholder="Caption"
          className="w-full border p-2"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
               
              >
                <option value="">Select Category</option>
                <option>Painter</option>
                <option>Dancer</option>
                <option>Photographer</option>
                <option>Sculptor</option>
                <option>Graphic Designer</option>
                <option>Mehndi Artist</option>
                <option>Drummer</option>
                <option>Singer</option>
                <option>Decorator</option>
                <option>Digital Artist</option>
                <option>Other</option>
              </select>
           
      
        <select
          name="mediaType"
          className="w-full border p-2"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="">Select Media Type</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={uploading}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
