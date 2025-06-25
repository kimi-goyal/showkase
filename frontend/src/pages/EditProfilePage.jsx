import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    bio: '',
    category: '',
    location: '',
    profilePicture: '',
    socialLinks: [''],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/artists/${id}`);
        const data = res.data;
        setFormData({
          fullname: data.fullname || '',
          username: data.username || '',
          bio: data.bio || '',
          category: data.category || '',
          location: data.location || '',
          profilePicture: '',
          socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [''],
        });
      } catch (err) {
        console.error('Error fetching artist data:', err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = value;
    setFormData((prev) => ({ ...prev, socialLinks: updatedLinks }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, ''] }));
  };

  const removeSocialLink = (index) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks.splice(index, 1);
    setFormData((prev) => ({ ...prev, socialLinks: updatedLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        socialLinks: JSON.stringify(formData.socialLinks),
      };
      await axiosInstance.put(`/artists/editProfile/${id}`, payload);
      navigate(`/artist/${id}`);
    } catch (err) {
      console.error('Error updating artist:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-teal-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 border border-teal-300">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-10">Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Full Name', name: 'fullname', value: formData.fullname },
              { label: 'Username', name: 'username', value: formData.username },
              { label: 'Location', name: 'location', value: formData.location },
              { label: 'Category (e.g. Drummer)', name: 'category', value: formData.category },
            ].map(({ label, name, value }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-teal-700 mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="w-full border border-teal-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">Social Links</label>
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-3 mb-2">
                <input
                  type="text"
                  value={link || ''}
                  onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                  className="w-full p-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  placeholder={`https://link${index + 1}.com/yourprofile`}
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 text-lg font-bold hover:text-red-700"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSocialLink}
              className="text-sm text-teal-600 hover:underline mt-1"
            >
              + Add another link
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
