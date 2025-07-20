import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import RentItLogo from '../../assets/logo/RentIt.png';
import { LuLayoutDashboard, LuUpload } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { GoGitPullRequestDraft } from "react-icons/go";
import { RiMessage2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [adminDashboard , setAdminDashboard] =useState(false)
  // const [userDashboard , setUserDashboard] = useState(false)

  // Load user info from localStorage
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', updateUser);
    updateUser();

    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleUserDropDown = () => {
    setUserDropdown((prev) => !prev);
  };

  // Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 ml-10 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-indigo-600">
            <img
              src={RentItLogo}
              alt="RentIt Logo"
              style={{ width: '120px', maxWidth: '100%' }}
            />
          </Link>
          {/* Navbar links */}
          <div className="hidden md:flex space-x-8 justify-center flex-1 text-md p-3">
            <Link to="/" className="text-gray-700 hover:bg-indigo-200 p-2 hover:rounded-lg font-medium transition">
              About
            </Link>
            <Link to="/" className="text-gray-700 hover:bg-gray-200 p-2 hover:rounded-lg font-medium transition">
              Pricing
            </Link>
            <Link to="/" className="text-gray-700 hover:bg-indigo-200 p-2 hover:rounded-lg font-medium transition">
              categories
            </Link>
            <Link to="/" className="text-gray-700 hover:bg-indigo-200 p-2 hover:rounded-lg font-medium transition">
              Contact
            </Link>
          </div>
          {/* search box */}
          <div className="flex-grow max-w-md w-full mx-auto px-2">
            <div className="relative text-gray-600">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white h-10 px-5 pr-10 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                <svg
                  className="h-5 w-5 fill-current text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.966 56.966"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887l-14.81-14.81c3.486-4.205,5.598-9.626,5.598-15.52 C45.934,9.589,35.645,0.3,23.467,0.3C11.289,0.3,1,9.589,1,21.757s10.289,21.457,22.467,21.457 c5.381,0,10.292-1.852,14.194-4.938l14.936,14.937c0.586,0.586,1.354,0.878,2.121,0.878s1.535-0.292,2.121-0.878 C56.317,54.957,56.317,53.06,55.146,51.887z M23.467,39.214c-9.639,0-17.457-7.818-17.457-17.457S13.828,4.3,23.467,4.3 s17.457,7.818,17.457,17.457S33.106,39.214,23.467,39.214z" />
                </svg>
              </button>
            </div>
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center ">

            {!user ? (
              <>
                <Link to="/register">
                  <button className="px-4 py-2 bg-white font-bold text-gray-700 rounded-md hover:bg-gray-200 border-2 border-gray-400 transition">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-800 to-purple-600 font-bold text-white rounded-md hover:bg-indigo-700 transition">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <span className="font-semibold text-gray-700 flex gap-4 items-center relative">
                  {user.name} ({user.role})

                  {/* User Dropdown Name Initials*/}
                  <button
                    onClick={handleUserDropDown}
                    type="button"
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex items-center bg-red-400 justify-center text-white font-bold text-xl"
                  >
                    {user.name
                      .split(" ")
                      .map((word, index, arr) =>
                        index === 0 || index === arr.length - 1 ? word.charAt(0) : ""
                      )
                      .join("")}
                  </button>

                  {/* Dropdown */}
                  {userDropdown && (
                    <div
                      ref={dropdownRef}
                      className="w-60 h-fit p-6 bg-white absolute top-14 right-0 rounded-md shadow-lg z-50"
                    >
                      <h3 className="text-center w-full text-xl font-sans font-bold p-1 text-black border-b border-gray-500">
                        {user.name}
                      </h3>
                      <div className=' flex flex-col p-1 mt-2 cursor-pointer text-md text-left rounded text-gray-700'>

                       <div  onClick={() => navigate(`/${user.role}-dashboard`)}  className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2'><LuLayoutDashboard className='text-xl text-gray-700' /> Your Dashboard</div> 

                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '> <MdAccountCircle className='text-xl text-gray-700' /> Your Account</div>
                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '> <BsBoxes className='text-xl text-gray-700' />Your Products</div>
                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '><GoGitPullRequestDraft className='text-xl text-gray-700' /> Your Request</div>
                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '> <RiMessage2Line className='text-xl text-gray-700' />Your Message</div>
                        <div className='mt-1 hover:bg-gray-200 transition flex gap-4 items-center p-2 '><LuUpload className='text-xl text-gray-700' />  Post Product</div>
                        <div onClick={handleLogout} className='mt-1 hover:bg-gray-200 transition flex gap-4 items-center p-2 '><IoLogOutOutline className='text-xl text-gray-700' /> Logout</div>
                      </div>
                    </div>
                  )}
                </span>
              </>
            )}
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
            {!user ? (
              <>
                <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-white shadow-md border-t border-gray-200 items-center">
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3border-2 border-gray-400 rounded-xl">About</Link>
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3">Pricing</Link>
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3">Categories</Link>
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3">Contact</Link>

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
              </>
            ) : (
              <>
              <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-white shadow-md border-t border-gray-200 items-center">
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3 border-2 border-gray-400 rounded-xl">About</Link>
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3">Pricing</Link>
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3">Categories</Link>
                  <Link to="/" className="block text-gray-700 hover:bg-gray-200 transition m-auto text-center p-3">Contact</Link>
                  </div>

                {/* <div className="w-full text-center text-gray-800 font-medium mt-2">
                  👤 {user.name} ({user.role})
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button> */}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
