import express from 'express';
import {
  createPost,
  getPostById,
  getAllPosts,
  deletePosts,
  getPostsByArtistController,
  addComment,
  toggleLike,
  deleteComment
} from "../controllers/post.controller.js";

import { getArtistDashboardStats } from '../controllers/artist.contoller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post("/create", protectRoute, createPost);
route.get("/posts", getAllPosts);

// 🟢 Group these under /artist/
route.get('/artist/my-posts/:id', getPostsByArtistController);
route.get('/artist/dashboard/:id', getArtistDashboardStats);

// 🟢 Move this to the bottom so it doesn’t clash with others
route.get("/:id", getPostById);

// 🟢 Comments & Likes
route.post("/:id/like", protectRoute, toggleLike);
route.post("/:id/comment", protectRoute, addComment);
route.delete('/:id/comment/:commentId', protectRoute, deleteComment);
route.delete("/deletePost/:id", protectRoute, deletePosts);

export default route;
