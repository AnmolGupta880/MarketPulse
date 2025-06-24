import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-400">MarketPulse 📊</h1>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-gray-300 font-medium">
             <a
            href="https://anmolportfolio-delta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white text-black px-3 py-1 rounded hover:bg-red-400 transition duration-200">
              Portfolio
            </button>
          </a>
            <a
            href="https://github.com/AnmolGupta880"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white text-black px-3 py-1 rounded hover:bg-red-400 transition duration-200">
              Github
            </button>
          </a>
          </ul>
          <a
            href="https://www.linkedin.com/in/anmol-gupta-b9bab8227/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white text-black px-3 py-1 rounded hover:bg-red-400 transition duration-200">
              LinkedIn
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
