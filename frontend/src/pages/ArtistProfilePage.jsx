import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArtistGallery from '../components/ArtistGallery';
import axios from 'axios';
import { Pencil, Plus, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';



const ArtistProfilePage = () => {
  
const { authUser } = useAuthStore();
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/artists/${id}`);
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistProfile();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading...</div>;
  if (!artist) return <div className="flex justify-center items-center min-h-screen text-gray-600">Artist not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 px-4">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow flex items-center h-12 px-6 z-50">
        <Link 
          to="/explore" 
          className="flex items-center gap-1 text-teal-600 font-semibold text-sm hover:text-gray-900 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Explore
        </Link>
      </nav>

      {/* Profile Card */}
      <section className="relative bg-white rounded-2xl p-6 max-w-4xl mx-auto mt-8 shadow-lg flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        
        {/* Edit Icon */}
        {authUser?._id === artist._id && (
  <Link 
    to={`/edit-profile/${artist._id}`} 
    className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 transition"
    title="Edit Profile"
  >
    <Pencil size={18} />
  </Link>
)}


        {/* Profile Pic */}
        <img 
          src={artist.profilePic || "https://placehold.co/100x100"} 
          alt={`${artist.fullname} profile`} 
          className="w-24 h-24 rounded-full border-2 border-white shadow-sm object-cover"
        />

        {/* Info Block */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">
            {artist.fullname
              ?.toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </h1>
          <p className="text-gray-500 text-sm">@{artist.username || artist.fullname.toLowerCase().replace(/\s/g, '')}</p>

          {/* Category & Location */}
          <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-medium text-gray-600">
            {artist.category && (
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">{artist.category}</span>
            )}
            {artist.location && (
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">{artist.location}</span>
            )}
          </div>

          {/* Bio */}
          {artist.bio && (
            <p className="mt-3 text-gray-700 text-sm leading-relaxed max-w-lg">{artist.bio}</p>
          )}
        </div>

        {/* Upload Post Icon */}
        <Link 
          to={`/create-post`} 
          className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full shadow-md transition"
          title="Upload Post"
        >
          <Plus size={20} />
        </Link>
      </section>

      {/* Social Links */}
      {artist.socialLinks?.length > 0 && (
        <section className="mt-6 max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Social Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {artist.socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-teal-600 hover:underline truncate max-w-xs"
              >
                <ExternalLink size={14} /> {link}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto px-4 mt-10 mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gallery 
         
        </h2>
         
       <ArtistGallery artistId={artist._id} />

      </section>
    </div>
  );
};

export default ArtistProfilePage;
