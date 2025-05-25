import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const protectRoute = (req, res, next) =>{
    try {
         const token = req.cookies.jwt;

    if(!token){
         return res.status(401).json({message:"Unauthorised user- No token provided"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
         return res.status(401).json({message:"Unauthorised-Invalid token"})
    }

    const user = User.findById(decoded.userId).select("-password");

    req.user = user;
next();
    } catch (error) {
     res.status(500).json({message:"Internal server error"})
      console.log("Error in protect middleware", error.message)   
    }
   
}