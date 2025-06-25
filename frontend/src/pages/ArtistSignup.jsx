import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const ArtistSignup = () => {
  const{updateProfile, checkIfArtist} = useAuthStore();
    
  const navigate = useNavigate();
  useEffect(()=>{
    checkIfArtist(navigate);
  },[])
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    category: '',
    location: '',
    socialLinks: [''],
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (index, value) => {
    const links = [...formData.socialLinks];
    links[index] = value;
    setFormData(prev => ({ ...prev, socialLinks: links }));
  };

  const handleAddSocialLink = () => {
    setFormData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, ''] }));
  };

  const handleProfilePictureChange = (e) => {
    setFormData(prev => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const validateForm = () => {
    const { fullName, bio, category, location, socialLinks } = formData;
    if (!fullName.trim()) {
      toast.error('Full Name is required');
      return false
    }
    if (!bio.trim()) {
      toast.error('Bio is required');
       return false
    }
    if (!category.trim()) {
      toast.error('Please select an art category');
       return false
    }
    if (!location.trim()) {
      toast.error('Location is required');
       return false
    }
    if (formData.profilePicture.size > 5 * 1024 * 1024) {
  toast.error("File too large. Max 5MB allowed.");
  return;
}

    const invalidLink = socialLinks.find(
      (link) => link.trim() !== '' && !/^https?:\/\/.+\..+/.test(link)
    );
    if (invalidLink) {
      toast.error('Please enter valid social media links');
       return false
    }
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const success = validateForm();
  if (!success) return;

  try {
    let base64Image = '';
    if (formData.profilePicture) {
      base64Image = await toBase64(formData.profilePicture);
    }

    const payload = {
      ...formData,
      profilePic: base64Image,
      profilePicture: undefined, // remove the File object
    };

    updateProfile(payload, navigate);
  } catch (err) {
    console.error("Error converting image:", err);
    toast.error("Something went wrong while uploading the image");
  }
};

// Utility function
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 via-teal-300 to-teal-100 flex items-center justify-center py-16 px-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-gray-800"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <h1 className="text-4xl font-extrabold text-teal-700 text-center mb-6 select-none">
            🎨 Artist Signup
          </h1>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="font-semibold block mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:ring-4 focus:ring-teal-400 transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="font-semibold block mb-1">Bio <span className="text-red-500">*</span></label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Tell us about your passion..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md resize-none focus:ring-4 focus:ring-teal-400 transition"
            />
          </div>

          {/* Category and Location */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="category" className="font-semibold block mb-1">Category <span className="text-red-500">*</span></label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md bg-white focus:ring-4 focus:ring-teal-400 transition"
              >
                <option value="" disabled>Select your art type</option>
                <option>Painter</option>
                <option>Dancer</option>
                <option>Photographer</option>
                <option>Sculptor</option>
                <option>Graphic Designer</option>
                <option>Mehndi Artist</option>
                <option>Drummer</option>
                <option>Singer</option>
                <option>Decorator</option>
                <option>Digital Artist</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="location" className="font-semibold block mb-1">Location <span className="text-red-500">*</span></label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md bg-white focus:ring-4 focus:ring-teal-400 transition"
              >
                <option value="">Select your state</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Pune">Pune</option>
                <option value="Amritsar">Amritsar</option>
              </select>

            </div>
          </div>

          {/* Social Links */}
          <div>
            <label className="font-semibold block mb-1">Social Links</label>
            {formData.socialLinks.map((link, idx) => (
              <div key={idx} className="flex items-center gap-3 mb-3">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleSocialLinkChange(idx, e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:ring-4 focus:ring-teal-400 transition"
                />
                {idx === formData.socialLinks.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="text-teal-600 font-semibold hover:text-teal-800 transition"
                  >
                    + Add
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Profile Picture */}
          <div>
            <label htmlFor="profilePicture" className="font-semibold block mb-1">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white shadow-md focus:ring-4 focus:ring-teal-400 transition cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:from-teal-600 hover:to-teal-700 transition-colors"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtistSignup;
