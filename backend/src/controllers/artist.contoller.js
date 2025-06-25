import User from "../models/user.model.js";
import cloudinary from '../utils/cloudinary.js'; 
import mongoose from "mongoose"
import Post from "../models/post.model.js";

export const createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, category, profilePic, socialLinks, location } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!bio || !category || !location) {
      return res.status(400).json({ message: "Please fill the required fields" });
    }

    let uploadedProfilePicUrl = "";

    // Upload only if profilePic is provided
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      uploadedProfilePicUrl = uploadResponse.secure_url;
    }

    
    const updateData = {
      role: "artist",
      bio,
      category,
      location,
      isArtistProfileComplete: true,
    };

    if (uploadedProfilePicUrl) {
      updateData.profilePic = uploadedProfilePicUrl;
    }

    if (Array.isArray(socialLinks) && socialLinks.length > 0) {
      updateData.socialLinks = socialLinks;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Artist profile created successfully",
      profile: updatedUser,
    });
  } catch (error) {
    console.log("Error in update artist handler:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userProfile = await User.findById(userId).select("-password");
    if (!userProfile) {
      return res.status(404).json({ message: "User  not found" });
    }

    const posts = await Post.find({ userId }).select("mediaUrl"); 
    const galleryImages = posts.map(post => post.media[0].mediaUrl); 
    res.status(200).json({ ...userProfile.toObject(), galleryImages });
  } catch (error) {
    console.log("Error in get profile controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const exploreArtists = async (req, res) => {
  try {
    const rawPage = req.query.page || "1";
    const rawLimit = req.query.limit || "6";
    const page = parseInt(rawPage);
    const limit = parseInt(rawLimit);
    const search = req.query.search || "";
    const category = req.query.category || "";
    const location = req.query.location || "";
    const skip = (page - 1) * limit;
     const query = {
      role: "artist",
      isArtistProfileComplete: true,
      _id: { $ne: req.user._id }, 
    };

    if (search) {
      query.fullname = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }

    const [artists, totalArtists] = await Promise.all([
      User.find(query)
        .select("fullname profilePic category location")
        .skip(skip)
        .limit(limit),
      User.countDocuments(query),
    ]);


    res.status(200).json({
      message: "Artists fetched successfully",
      currentPage: page,
      totalArtists,
      artists,
    });
  } catch (error) {
    console.error("Error in exploreArtists:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const editProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    let updatedFields = { ...req.body };

    if (req.body.profilePicture && req.body.profilePicture.startsWith("data:image")) {
      const uploaded = await cloudinary.uploader.upload(req.body.profilePicture);
      updatedFields.profilePic = uploaded.secure_url;
    }

    // Parse socialLinks if sent as a string
    if (typeof req.body.socialLinks === 'string') {
      updatedFields.socialLinks = JSON.parse(req.body.socialLinks);
    }

    const updatedArtist = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    if (!updatedArtist) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedArtist);
  } catch (err) {
    console.error("Edit profile error:", err);
    res.status(500).json({ error: 'Update failed' });
  }
};


export const getArtistDashboardStats = async (req, res) => {
  try {
    const artistId = req.params.id;
    const posts = await Post.find({ artist: artistId });

    const totalPosts = posts.length;
    const totalLikes = posts.reduce((acc, post) => acc + post.likes.length, 0);
    const totalComments = posts.reduce((acc, post) => acc + post.comments.length, 0);

    const recentPosts = posts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 6)
      .map(post => ({
        _id: post._id,
        mediaUrl: post.mediaUrl,
        mediaType: post.mediaType,
      }));

    res.status(200).json({ totalPosts, totalLikes, totalComments, recentPosts });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserDetails = async (req, res) => {
  // console.log("request consoled ",req);
  if (!req.user) {
    return res.status(401).json({ message: 'User  not found' });
  }
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json(user);
}