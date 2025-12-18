import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-wide text-indigo-400">
          MarketPulse
        </h1>

        <div className="flex items-center gap-3">
          <a
            href="https://anmolportfolio-delta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-black hover:bg-indigo-400 hover:text-white transition"
          >
            Portfolio
          </a>

          <a
            href="https://github.com/AnmolGupta880"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-black hover:bg-indigo-400 hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/anmol-gupta-b9bab8227/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}
