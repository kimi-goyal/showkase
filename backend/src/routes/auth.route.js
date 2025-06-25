import express from 'express';
import {login, logout, signup,checkAuth} from '../controllers/auth.controller.js'
import {protectRoute} from "../middlewares/auth.middleware.js"
const route = express.Router();

route.post('/login', login);
route.post('/signup', signup);
route.post('/logout', logout);
route.get("/check",protectRoute , checkAuth);

export default route;
