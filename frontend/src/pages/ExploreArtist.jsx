import React, { useState, useEffect } from "react";
import ArtistCard from "../components/ArtistCard";
import SearchFilterBar from "../components/SearchFilterBar";
import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";

const backgroundImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80";

const ExploreArtists = () => {
  const fetchArtists = useAuthStore((state) => state.fetchArtists);
  const [allArtists, setAllArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const loadArtists = async () => {
    const res = await fetchArtists({ page, limit: perPage, search, category, location });
    if (res) {
      setAllArtists(res.artists);
      setTotalPages(Math.ceil(res.totalArtists / perPage));
    }
  };

  useEffect(() => {
    loadArtists();
  }, [page, search, category, location]);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <Navbar />
   <h1
  id="explore-title"
  className="text-4xl font-extrabold text-teal-700 mt-3  backdrop-blur-md text-center select-none"
>
  Discover Artists
</h1>
      
      <div className="flex-grow  flex flex-col items-center text-[#2d3748]">
        <main
          className="w-full max-w-6xl  backdrop-blur-md rounded-lg shadow-lg p-8"
          role="main"
          aria-labelledby="explore-title"
        >
        
          <SearchFilterBar
            search={search}
            category={category}
            location={location}
            setSearch={setSearch}
            setCategory={setCategory}
            setLocation={setLocation}
          />

          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mt-10"
            aria-live="polite"
          >
            {allArtists.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No artists found for your criteria.
              </p>
            ) : (
              allArtists.map((artist) => (
                <ArtistCard
                  key={artist._id}
                  id={artist._id}
                  name={artist.fullname}
                  category={artist.category}
                  location={artist.location}
                  photo={artist.profilePic}
                  className="transition-transform hover:scale-105 hover:shadow-xl"
                />
              ))
            )}
          </div>

          <nav
            className="flex justify-center mt-12 gap-6 select-none"
            aria-label="Pagination"
          >
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="bg-teal-600 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-md transition hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className="bg-teal-600 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-md transition hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default ExploreArtists;
