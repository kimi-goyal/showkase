import express from 'express';
import {createPost, getPostById, getAllPosts, deletePosts, getPostsByArtistController, addComment, toggleLike, deleteComment} from "../controllers/post.controller.js"
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getArtistDashboardStats } from '../controllers/artist.contoller.js';
const route = express.Router();

route.post("/create",protectRoute, createPost);
route.get("/posts", getAllPosts);
route.get('/my-posts/:id', getPostsByArtistController);
route.post("/:id/like", protectRoute, toggleLike);
route.post("/:id/comment", protectRoute, addComment);
route.delete('/:id/comment/:commentId', protectRoute, deleteComment);
route.delete("/deletePost/:id", protectRoute, deletePosts);
route.get('/dashboard/:id', getArtistDashboardStats);

route.get("/:id", getPostById);


export default route;