import { create } from "zustand";
import { axiosInstance } from "../lib/axios.jsx";
import toast from "react-hot-toast";
import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ? "http://:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  userRole: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

     
      set({ authUser: res.data, userRole: res.data.role });

     
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data, userRole: res.data.role});
      toast.success("Account created successfully");
     
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data, userRole: res.data.role });
      
      toast.success("Logged in successfully");

      
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
   
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

 fetchArtists: async ({ page = 1, limit = 6, search = "", category = "", location = "" }) => {
    try {
      const response = await axiosInstance.get(`/artists/explore`, {
        params: { page, limit, search, category, location }
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching artists:", error);
      return null; 
    }
  },


  updateProfile: async (data, navigate) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/artists/updateProfile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
       if (navigate) navigate("/explore");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  checkIfArtist:async (navigate) => {
      try {
        const { data } = await axiosInstance.get('/artists/me'); 
        set({ userRole: data.role });
        if (data.role === 'artist' && data.isArtistProfileComplete) {
          navigate(`/artist/${data._id}`); // redirect to their artist profile
        }else if (data.role === 'user') {
        navigate('/artistsignup'); // Redirect to artist signup page
      }
      } catch (error) {
        console.error("Error checking artist role", error);
      }
    }

   
}))
