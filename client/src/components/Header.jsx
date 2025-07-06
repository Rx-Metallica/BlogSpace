import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4f46e5] text-white py-20 px-6 text-center shadow-2xl rounded-b-3xl relative overflow-hidden">
      {/* Decorative blur circle */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>

      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-transparent bg-clip-text mb-4">
        BlogSpace
      </h1>

      <p className="text-xl md:text-2xl text-gray-200 italic mb-5 max-w-2xl mx-auto">
        "Your thoughts deserve the spotlight. Write boldly, the world is listening."
      </p>

      {/* <span className="inline-block bg-white text-indigo-900 font-bold px-6 py-2 rounded-full text-sm shadow-lg tracking-wider animate-pulse hover:scale-105 transition-transform duration-300">
        🌟 Featured with AI
      </span> */}
    </header>
  );
};

export default Header;
