import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-white text-[#2d3748]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 md:px-16 py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504198266285-165a4dd7c040?auto=format&fit=crop&w=1500&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Where Art Meets Opportunity
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light drop-shadow">
            A creative network built for India’s rising freelance talent.
            Showcase your skills. Discover artists. Collaborate freely.
          </p>
          <Link
            to="/signup"
            className="bg-teal-500 hover:bg-teal-400 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-xl transition duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {[
            {
              title: "1. Create Your Profile",
              desc: "Tell your story, upload your portfolio, and let the world know what you do best.",
              icon: "https://img.icons8.com/color/96/id-verified.png",
            },
            {
              title: "2. Post & Share Your Art",
              desc: "Add posts, photos, or short clips of your projects. Build a following and get discovered.",
              icon: "https://img.icons8.com/color/96/gallery.png",
            },
            {
              title: "3. Connect & Get Hired",
              desc: "Clients looking for artists will find you via category, location, and work quality.",
              icon: "https://img.icons8.com/color/96/handshake.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <img src={item.icon} alt="" className="mb-4 w-16 h-16" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      <section className="bg-teal-50 py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-12">
          ✨ Artists of the Week
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            "https://images.unsplash.com/photo-1611605698335-fd0b91d7d2c2?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1587613869402-fd0848d3c3c6?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
          ].map((src, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
            >
              <img
                src={src}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/400x300?text=Artist")
                }
                alt="Artist"
                className="rounded-md mb-4 h-60 w-full object-cover"
              />
              <h3 className="text-lg font-bold text-teal-700 mb-1">
                Artist {i + 1}
              </h3>
              <p className="text-sm text-gray-500">
                Category: Creative | Location: India
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-20 text-center bg-white">
        <h2 className="text-4xl font-bold text-teal-700 mb-12">
          💬 Hear From Our Community
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Riya, Graphic Designer",
              text: "I’ve landed three freelance gigs in just a month! It’s the best platform for artists who want visibility.",
            },
            {
              name: "Aditya, Musician",
              text: "Clients now come to *me*. I simply uploaded a few videos and started getting offers.",
            },
            {
              name: "Pooja, Dancer",
              text: "It’s like a magical blend of Instagram and LinkedIn — but just for artists.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-teal-100 rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-gray-700 mb-4 italic">“{t.text}”</p>
              <h4 className="font-semibold text-teal-800">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Feed Teaser */}
      <section className="py-20 px-6 md:px-20 bg-teal-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-8">🔥 Explore Our Artist Feed</h2>
        <p className="text-lg mb-8">
          Real artists. Real content. Photos, videos & more from creators across India.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1506790409786-287062b21cfe?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1498654200320-5f26e1fdfd1c?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=300&q=80",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300?text=Art")
              }
              alt="Artist post"
              className="rounded-md object-cover h-48 w-full"
            />
          ))}
        </div>
        <Link
          to="/signup"
          className="mt-10 inline-block bg-white text-teal-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition"
        >
          Create Your Profile
        </Link>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-200 to-white text-center">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">Start Showcasing Your Talent</h2>
        <p className="text-gray-700 mb-6">
          No matter what your art is — this is your platform.
        </p>
        <Link
          to="/signup"
          className="bg-teal-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md hover:bg-teal-500 transition"
        >
          Join for Free
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
