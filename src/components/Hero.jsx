import React from 'react';
import { useNavigate } from 'react-router';

function Hero() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center flex-1 bg-gray-900 bg-gradient-to-b from-indigo-900'>
      <h1 className='text-5xl font-bold mb-4 text-white'>
        Welcome to <span className='text-purple-400'>Characters Wiki</span>
      </h1>
      <p className='text-lg text-gray-300 mb-8'>
        Discover, search, and add your favorite characters from all universes!
      </p>
      <button
        onClick={() => navigate('/characters')}
        className='bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-purple-700 transform hover:scale-105 transition duration-300'>
        Explore Characters
      </button>
    </div>
  );
}

export default Hero;
