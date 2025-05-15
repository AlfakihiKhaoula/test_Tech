import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold tracking-wide">Rick & Morty</h1>
      <div className="space-x-6">
        <Link
          to="/"
          className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
