import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="QR Menu Logo" className="h-8 w-8" />
        <span className="text-xl font-semibold text-gray-800 hidden md:block">
          QR Menu
        </span>
      </div>

      <div className="flex items-center space-x-38">
        <a
          href="/help"
          className="text-gray-600 text-xs md:text-lg hover:text-blue-600 transition"
        >
          Help
        </a>
        <a
          href="/about"
          className="text-blue-600 text-xs md:text-lg font-semibold hover:text-blue-800 transition"
        >
          Powered by Raybit Technologies
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
