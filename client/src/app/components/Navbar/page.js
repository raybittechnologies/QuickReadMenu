import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="QR Menu Logo" className="h-8 w-8" />
        <span className="text-xl font-semibold text-gray-800">QR Menu</span>
      </div>

      <div className="flex items-center space-x-6">
        <a
          href="/help"
          className="text-gray-600 hover:text-blue-600 transition"
        >
          Help
        </a>
        <a
          href="/about"
          className="text-gray-600 font-semibold hover:text-blue-600 transition"
        >
          Powered by Raybit
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
