import Post from "../models/post.model.js"
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose"

export const createPost = async (req, res) => {
try {
    const { mediaUrl, caption, category, mediaType } = req.body;

    if (!mediaUrl || !caption || !category ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPost = await Post.create({
      artist: req.user._id,
      mediaUrl,
      caption,
      category,
      mediaType,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
    
};
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("userId", "fullname profilePic category");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.error("Error in getPostById:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;       
    const limit = parseInt(req.query.limit) || 10;    
    const skip = (page - 1) * limit;                  

    const totalPosts = await Post.countDocuments();   

    const posts = await Post.find()
      .populate("artist", "fullname profilePic category").populate({
    path: "comments.user",
    select: "fullname profilePic"
  })
      .sort({ createdAt: -1 })
      .skip(skip)    
      .limit(limit);

    res.status(200).json({
      totalPosts,           
      totalPages: Math.ceil(totalPosts / limit), 
      currentPage: page,
      posts,                // actual 10 posts
    });
  } catch (error) {
    console.log("Error in getAllPosts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deletePosts = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.artist.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Unauthorized to delete this post" });
}

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePosts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getPostsByArtistController = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Post.find({ artist: id })
      .populate("artist", "fullname profilePic category") 
      .populate("comments.user", "fullname profilePic")   
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts,
      totalPosts: posts.length,
    });
  } catch (error) {
    console.error("Error in getPostsByArtistController:", error.message);
    res.status(500).json({ message: "Error fetching artist posts" });
  }
};





   export const toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;  

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Convert all likes to strings and compare to userId as string
    const alreadyLiked = post.likes.some(
      id => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push( new mongoose.Types.ObjectId(userId));
    }

    await post.save();

    res.status(200).json({ message: alreadyLiked ? "Unliked" : "Liked", liked: !alreadyLiked });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Error toggling like" });
  }
};
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user._id, text });
    await post.save();

    // Populate the user details in comments before sending back
    await post.populate({
      path: 'comments.user',
      select: 'fullname profilePic',
    });

    res.status(201).json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

  post.comments.pull(commentId); 
    await post.save();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


