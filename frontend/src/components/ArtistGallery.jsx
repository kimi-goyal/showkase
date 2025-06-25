import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';

const ArtistGallery = () => {
  const { id } = useParams(); // Artist ID
  const [posts, setPosts] = useState([]);
  const { authUser } = useAuthStore();

  const fetchArtistPosts = async () => {
    try {
      const res = await axiosInstance.get(`/post/my-posts/${id}`);
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error('Failed to fetch artist posts', err);
    }
  };

  useEffect(() => {
    fetchArtistPosts();
  }, [id]);

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/post/deletePost/${postId}`);
      setPosts(prev => prev.filter(post => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post", err);
      alert("Failed to delete the post");
    }
  };


  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axiosInstance.delete(`/post/${postId}/comment/${commentId}`);
      fetchArtistPosts(); // Refresh after deletion
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  
 return (
  <div>
    
   
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gray-50">

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts by this artist yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
          {posts.map(post => (
            <div key={post._id} className="relative group overflow-hidden rounded-xl cursor-pointer">
              {/* Delete Button */}
              {authUser?._id === post.artist._id && (
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white bg-opacity-70 rounded-full p-1 z-10"
                  title="Delete Post"
                >
                  🗑
                </button>
              )}
              {post.mediaType === 'image' ? (
                <img
                  src={post.mediaUrl}
                  alt="Artist post"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <video
                  src={post.mediaUrl}
                  className="w-full h-48 object-cover"
                  controls
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold text-sm">
                ❤️ {post.likes?.length || 0}    💬 {post.comments?.length || 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default ArtistGallery;
