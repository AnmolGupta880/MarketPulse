import React, { useState, useRef } from 'react';

export default function StockCardWrapper({ title, children }) {
  const contentRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      ref={contentRef}
      className={`group bg-white hover:bg-indigo-50 rounded-xl p-6 overflow-hidden relative border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute top-2 right-2 text-gray-400 hover:bg-red-50
 hover:text-blue-500 text-lg"
      >
        {isMinimized ? '➕' : '❌'}
      </button>

      <h3 className="text-xl font-semibold text-indigo-600 mb-3">{title}</h3>

      {!isMinimized && (
        <div className="transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-100">
          {children}
        </div>
      )}
    </div>
  );
}
