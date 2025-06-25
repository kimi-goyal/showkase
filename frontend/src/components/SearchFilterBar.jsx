
import React from "react";

const SearchFilterBar = ({ search, category, location, setSearch, setCategory, setLocation }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-between items-center w-full">
      <input
        type="search"
        placeholder="Search artists..."
        className="flex-1 min-w-[200px] rounded-[12px] border-[1.5px] border-[#cbd5e0] py-2.5 px-4 text-base shadow-sm focus:outline-none focus:border-[#319795] focus:shadow-[0_0_8px_#319795]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search artists by name"
      />
      <select
        className="min-w-[170px] rounded-[12px] border-[1.5px] border-[#cbd5e0] py-2.5 px-6 text-base bg-white cursor-pointer shadow-sm focus:outline-none focus:border-[#319795] focus:shadow-[0_0_10px_#319795]"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        <option value="Painter">Painter</option>
        <option value="Dancer">Dancer</option>
        <option value="Photographer">Photographer</option>
        <option value="Sculptor">Sculptor</option>
        <option value="Graphic Designer">Graphic Designer</option>
        <option value="Mehndi Artist">Mehndi Artist</option>
        <option value="Drumer">Drumer</option>
        <option value="Singer">Singer</option>
        <option value="Decorator">Decorator</option>
        <option value="Digital Artist">Digital Artist</option>
        <option value="Other">Other</option>
      </select>
      <select
        className="min-w-[150px] rounded-[12px] border-[1.5px] border-[#cbd5e0] py-2.5 px-4 text-base bg-white cursor-pointer shadow-sm focus:outline-none focus:border-[#319795] focus:shadow-[0_0_10px_#319795]"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        aria-label="Filter by location"
      >
        <option value="">All Locations</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Pune">Pune</option>
        <option value="Amritsar">Amritsar</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
