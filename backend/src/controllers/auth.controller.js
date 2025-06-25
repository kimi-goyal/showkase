import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.util.js";

export const login =async (req,res)=>{
try {
    const {email, password} = req.body;

    if(!email || !password){
    return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(401).json({message:"Invalid Credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){ 
        return res.status(401).json({message:"Wrong Email or Wrong Password"})
    };

    generateToken(user._id, res);
    res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
    })

        
} catch (error) {
    console.log("Error in login controller", error.message);
}
}
export const logout = (req, res)=>{
 try {
    res.cookie("jwt","", {maxAge: "0"});
    res.status(200).json({message:"logged out successfully"})
 } catch (error) {
    console.log("Error in logout controller", error.message);
 }
}
export const signup =async (req, res)=>{
    try {
        const {email, fullname, password} = req.body;

if(!email || !fullname || !password){
    return res.status(400).json({message: "All fields are required"})
}

if( password.length< 6 ){
    return res.status(400).json({message:"Password should be atleast 6 characters long"})
}

const user = await User.findOne({email});

if(user){
    return res.status(400).json({message:"User already exists. Login.."})
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({
    fullname, 
    email, 
    password:hashedPassword
})

if(newUser){
    generateToken(newUser._id, res);

    await newUser.save();
    res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
    })
}
else{
    console.log("Invalid data");
}
    } catch (error) {
        console.log("Error occured in signup controller", error.message);
         res.status(500).json({message:"Internal server error"});  
    }

}
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};