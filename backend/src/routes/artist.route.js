import express from 'express';
import { protectRoute } from "../middlewares/auth.middleware.js"
import User from "../models/user.model.js"
import { createOrUpdateProfile, getProfileById, exploreArtists, editProfile, getUserDetails} from '../controllers/artist.contoller.js';

const route = express.Router();
// route.get('/test', (req, res) => res.json({message: "Artist route working"}));
route.put('/updateProfile', protectRoute, createOrUpdateProfile);
route.get("/explore", exploreArtists);
route.get('/me', protectRoute, getUserDetails);
route.put('/editProfile/:id', editProfile);
route.get('/:id', getProfileById);


export default route;