import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AreYouArtist() {
  const [isSelected, setSelected] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (isSelected) {
      navigate('/artistsignup');
    } else {
      navigate('/explore-home');
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-teal-500 to-teal-300">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-teal-600 text-center font-poppins">
          Wanna continue as an artist?
        </h1>
        
        <div className="flex items-center text-lg">
          <input
            type="checkbox"
            name="Yes"
            id="Yes"
            className="hidden"
            onChange={() => setSelected(true)}
            checked={isSelected}
          />
          <label htmlFor="Yes" className="flex items-center cursor-pointer">
            <div className="w-5 h-5 border-2 border-teal-500 rounded-md flex items-center justify-center mr-2">
              {isSelected && <div className="w-3 h-3 bg-teal-500 rounded-md" />}
            </div>
            Yes, I want to create my Artist Profile
          </label>
        </div>

        <div className="flex items-center text-lg">
          <input
            type="checkbox"
            name="No"
            id="No"
            className="hidden"
            onChange={() => setSelected(false)}
            checked={!isSelected}
          />
          <label htmlFor="No" className="flex items-center cursor-pointer">
            <div className="w-5 h-5 border-2 border-teal-500 rounded-md flex items-center justify-center mr-2">
              {!isSelected && <div className="w-3 h-3 bg-teal-500 rounded-md" />}
            </div>
            No, I am just here to Explore!!
          </label>
        </div>

        <button 
          className="bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-200"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AreYouArtist;
