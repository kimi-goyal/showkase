import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  // Debugging: Log current user object
  console.log("🔍 authUser in Navbar:", authUser);

  const isArtist =
    authUser &&
    (authUser.role === "artist" || authUser?.role?.toLowerCase() === "artist");

  return (
    <nav className="sticky top-0 w-full bg-gradient-to-r from-teal-500 to-teal-300 shadow-md px-6 py-4 flex justify-between items-center select-none z-50">
      <Link
        to="/explore-home"
        className="font-bold text-lg text-white whitespace-nowrap cursor-default"
      >
        ShowKase
      </Link>

      <div className="flex items-center space-x-6 whitespace-nowrap text-white">
        <Link
          to="/explore"
          className="hover:text-teal-200 transition duration-200 font-semibold"
        >
          Explore
        </Link>
        <Link
          to="/explore-home"
          className="hover:text-teal-200 transition duration-200 font-semibold"
        >
          Feed
        </Link>

        {authUser ? (
          isArtist ? (
            <div className="relative group">
              <button className="hover:text-teal-200 transition duration-200 font-semibold">
                Artist 
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 border border-gray-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 z-50 text-sm font-normal">
                <Link
                  to={`/artist/${authUser._id}`}
                  className="block px-4 py-2 hover:bg-teal-50"
                >
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-teal-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-post"
                  className="block px-4 py-2 hover:bg-teal-50"
                >
                  Upload Post
                </Link>
                <Link
                  to={`/edit-profile/${authUser._id}`}
                  className="block px-4 py-2 hover:bg-teal-50"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="/artistsignup"
              className="hover:text-teal-200 transition duration-200 font-semibold"
            >
              Become an Artist
            </Link>
          )
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-teal-200 transition duration-200 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-teal-500 py-2 px-5 rounded-md hover:bg-teal-100 transition duration-200 whitespace-nowrap font-semibold"
            >
              Join Now
            </Link>
          </>
        )}

        {authUser && (
          <button
            onClick={logout}
            className="flex items-center gap-1 hover:text-teal-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300 rounded"
            aria-label="Logout"
            type="button"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
