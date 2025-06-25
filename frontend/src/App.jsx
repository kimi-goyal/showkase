import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ArtistProfilePage from './pages/ArtistProfilePage';
import ArtistSignup from './pages/ArtistSignup';
import ExploreArtists from './pages/ExploreArtist';
import CreatePostPage from './pages/CreatePostPage';
import EditProfilePage from './pages/EditProfilePage';
import AreYouArtist from   "./components/AreYouArtist"
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { Loader } from "lucide-react";
import ExploreHome from './pages/ExploreHome';

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  // const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({ authUser });

   if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={!authUser? <LandingPage />:< Navigate to = "/explore-home" />} />
        <Route path="/login" element={!authUser? <LoginPage />:< Navigate to = "/" />} />
        <Route path="/signup" element={!authUser?<SignupPage />:<Navigate to = "/areyouartist"/>} />
        <Route path="/artist/:id" element={<ArtistProfilePage/>} /> 
        <Route path="/explore" element={<ExploreArtists />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/areyouartist" element={<AreYouArtist/>}/>
        <Route path="/artistsignup" element={<ArtistSignup/>}/>
        <Route path="/create-posts" element={<CreatePostPage />} />
        <Route path="/explore-home" element={<ExploreHome/>} />
        <Route path="/edit-profile/:id" element={<EditProfilePage />} />


      </Routes>
    </Router>

      <Toaster />
      </>
  );
}

export default App;