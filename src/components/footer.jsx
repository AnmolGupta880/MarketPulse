import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-600 text-white py-4 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} MarketPulse. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:youremail@example.com"
            className="hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
