import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import RentItLogo from '../assets/RentIt.png';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-indigo-600">
           <img
        src={RentItLogo}
        alt="RentIt Logo"
        style={{
          width: '120px',
          maxWidth: '100%',
        }}
      />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/register">
              <button className="px-4 py-2 bg-white font-bold text-gray-700 rounded-md hover:bg-gray-200  border-2 border-gray-400 transition">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="px-4 py-2 bg-indigo-600 font-bold text-white rounded-md hover:bg-indigo-700 transition">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/register">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-4 mt-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-4 mt-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
