import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import PostCard from '../components/PostCard';
import Navbar from "../components/Navbar";

const backgroundImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80';

const ExploreHome = () => {
  const [posts, setPosts] = useState([]);
  const { authUser } = useAuthStore();

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/post/posts');
      setPosts(res.data.posts.reverse());
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!authUser) return alert('Please login to like posts');
    try {
      const res = await axiosInstance.post(`/post/${postId}/like`);
      const { liked } = res.data;

      setPosts(posts.map(post => {
        if (post._id === postId) {
          let newLikes = post.likes || [];
          if (liked) {
            newLikes = [...newLikes, authUser._id];
          } else {
            newLikes = newLikes.filter(id => id !== authUser._id);
          }
          return { ...post, likes: newLikes };
        }
        return post;
      }));
    } catch (err) {
      alert('Failed to like post');
      console.error(err);
    }
  };

  const handleAddComment = async (postId) => {
    if (!authUser) return alert('Please login to comment');
    const text = window.prompt('Write your comment:');
    if (!text) return;
    try {
      const res = await axiosInstance.post(`/post/${postId}/comment`, { text });
      setPosts(posts.map(post =>
        post._id === postId ? { ...post, comments: res.data.comments || post.comments } : post
      ));
    } catch (err) {
      alert('Failed to add comment');
      console.error(err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axiosInstance.delete(`/post/${postId}/comment/${commentId}`);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div>
      <Navbar/>
    <div
      className="min-h-screen py-8 px-4 md:px-8 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundColor: 'rgba(248, 250, 252, 0.85)',
        backgroundBlendMode: 'overlay',
      }}
    >
     

    
      <div className="max-w-4xl mx-auto">  
        

        {posts.length === 0 ? (
          <div className="text-center text-gray-500  text-lg">No posts to show</div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                onLike={handleLike}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ExploreHome;
