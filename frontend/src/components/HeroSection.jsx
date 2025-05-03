import React, { useState } from 'react';
import heroImage from '../assets/herosection.jpg';

const HeroSection = () => {
  const [exploreClicked, setExploreClicked] = useState(false);

  return (
    <section
      className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />

      {/* Main Content */}
      <div className="z-10 text-center px-6 max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Find the Perfect Ride & Stay
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Affordable cars and cozy rooms for students and travelers. Anytime, Anywhere.
        </p>

        {/* Buttons Section */}
        {!exploreClicked ? (
          <button
            onClick={() => setExploreClicked(true)}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Explore Now
          </button>
        ) : (
          <div className="mt-8 flex justify-center gap-6 animate-slide-up">
            <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-lg shadow-md transform hover:scale-105 transition duration-300">
              Explore Cars
            </button>
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-lg shadow-md transform hover:scale-105 transition duration-300">
              Explore Rooms
            </button>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-slide-up {
            animation: slideUp 0.6s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
