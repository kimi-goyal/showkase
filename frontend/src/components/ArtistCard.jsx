import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ id, name, category, location, photo }) => {
  return (
    <Link to={`/artist/${id}`} className="no-underline">
      <div
        className="bg-white shadow-[0_6px_18px_rgba(0,0,0,0.07)] rounded-[12px] p-4 cursor-pointer flex items-center gap-4 transition duration-300 hover:shadow-[0_14px_30px_rgba(49,151,149,0.45)] hover:-translate-y-[3px]"
      >
        <img
          src={photo || "https://placehold.co/100x100/000000/FFF"}
          alt={name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 shadow-[0_4px_12px_rgba(49,151,149,0.35)] bg-[#e6f6f5]"
        />
        <div className="flex flex-col justify-center">
          <div className="text-[#2c7a7b] font-bold text-[1.1rem]">
            {name
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
          <div className="text-sm text-[#4a5568]">{category}</div>
          <div className="text-sm text-[#4a5568]">{location}</div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
