import React, { useEffect, useState } from 'react';
import { GoHome, GoSearch, GoPlus } from "react-icons/go";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LiaUserCircleSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { LuLayoutDashboard, LuUpload } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { GoGitPullRequestDraft } from "react-icons/go";
import { RiMessage2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";


const BottomHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [activeIcon, setActiveIcon] = useState<string>('home'); // Default active icon is 'home'
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = () => {
    // Show the "logging out" message
    setIsLoggingOut(true);

    // Simulate a loading delay, then handle the logout logic
    setTimeout(() => {
      localStorage.removeItem('user');
      setUser(null);
      setIsLoggingOut(false);
      navigate('/');
    }, 2000);
  };

  const handleLinkClick = () => {
    // Close the sliding div when a link is clicked
    setIsOpen(false);
  };


  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', updateUser);
    updateUser();

    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handletoggleProfile = () => {
    setIsOpen(!isOpen)
    if (!setIsLoggingOut) {
      setIsOpen(false)
    }
  }

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);

    if (!user && (icon === 'profile' || icon === 'chat' || icon === 'post')) {
      navigate('/notsigned')
    }
    else {
      navigate('/')
    }

  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-400 shadow-lg z-30 sm:hidden">
        {/* This navbar will be hidden on sm and above, and visible on mobile */}
        <div className="flex justify-between items-center py-2 px-6 cursor-pointer relative">

          <div className={`flex flex-col items-center space-y-1 cursor-pointer ${activeIcon === 'home' ? 'text-purple-500 ' : 'text-gray-500'
            }`}
            onClick={() => handleIconClick('home')}
          >
            <GoHome size={26} />
            <span className="text-xs">Home</span>
            {activeIcon === 'home' && (
              <div className="w-10 h-1 bg-purple-500 absolute top-0 transform-translate-x-1/2 z-10"></div>
            )}
          </div>


          <div className={`flex flex-col items-center space-y-1 cursor-pointer ${activeIcon === 'search' ? 'text-purple-500' : 'text-gray-500'} `}
            onClick={() => handleIconClick('search')}
          >
            <GoSearch size={26} />
            <span className="text-xs">Search</span>
            {activeIcon === 'search' && (
              <div className='w-10 h-1 bg-purple-500 absolute top-0 transform-translate-x-1/2 z-10'></div>
            )}
          </div>


          <div onClick={() => handleIconClick('post')} className="relative flex items-center justify-center bg-purple-500 text-white rounded-full p-3 transform translate-y-[-50%] shadow-xl z-30">
            <GoPlus size={30} />
          </div>


          <div className={`flex flex-col items-center space-y-1 cursor-pointer ${activeIcon === 'chat' ? 'text-purple-500' : 'text-gray-500'} `}
            onClick={() => handleIconClick('chat')}
          >            <IoChatboxEllipsesOutline size={26} />
            <span className="text-xs">Chat</span>
            {activeIcon === 'chat' && (
              <div className='w-10 h-1 bg-purple-500 absolute top-0 transform-translate-x-1/2 z-10'></div>
            )}
          </div>

          {/* Profile Icon */}
          {!user ? (
            <div className={`flex flex-col items-center space-y-1 cursor-pointer ${activeIcon === 'profile' ? 'text-purple-500' : 'text-gray-500'} `}
              onClick={() => handleIconClick('profile')}
            >
              <LiaUserCircleSolid size={26} />
              <span className="text-xs">Profile</span>
              {activeIcon === 'profile' && (
                <div className='w-10 h-1 bg-purple-500 absolute top-0 transform-translate-x-1/2 z-10'></div>
              )}
            </div>
          ) : (
            <>
              <span className="font-semibold text-gray-700 flex gap-4 items-center relative">

                <div className={`flex flex-col items-center space-y-1 cursor-pointer ${activeIcon === 'profile' ? 'text-purple-500' : 'text-gray-500'} `}
                  onClick={() => handleIconClick('profile')}
                >                   <button
                  type="button"
                  onClick={handletoggleProfile}
                  className="w-7 h-7 rounded-full overflow-hidden cursor-pointer flex items-center bg-red-400 justify-center text-white font-bold text-md"
                >
                    {user.name
                      .split(" ")
                      .map((word, index, arr) =>
                        index === 0 || index === arr.length - 1 ? word.charAt(0) : ""
                      )
                      .join("")}
                  </button>
                  <span className="text-xs">{user.name}</span>
                  {activeIcon === 'profile' && (
                    <div className='w-10 h-1 bg-purple-500 absolute top-0 transform-translate-x-1/2 z-10'></div>
                  )}
                </div>

                {isOpen && (
                  <>
                  {/* <div className='flex flex-col gap-3 w-full h-fit bg-red-500'> 

                    <div className='bg-gray-400 w-full h-fit flex flex-col m-auto fixed z-20'>
                      <div className="border-t-3 border-gray-400 mt-10 pt-4 m-auto "></div>
                      <h3 className='text-gray-600 text-sm text-center '>Profile</h3>
                    </div> */}

                    <div
                      className={`${isOpen ? "transform translate-y-[-5%]" : "transform translate-y-full"
                        } fixed bottom-[54px] left-0 w-full z-10 bg-white text-white p-4 transition-all duration-300 ease-in-out sm:hidden rounded-t-xl h-[calc(60vh-64px)] overflow-y-auto scrollbar-hidden border-2 border-t-gray-400`}
                    >

                      {/* Links inside the sliding div */}
                      <div onClick={handleLinkClick} className=' flex flex-col p-1 mt-2 cursor-pointer text-md text-left rounded text-gray-700 z-10 '>

                        <div onClick={() => navigate(`/${user.role}-dashboard`)} className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2'><LuLayoutDashboard className='text-xl text-gray-700' /> Your Dashboard</div>

                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '> <MdAccountCircle className='text-xl text-gray-700' /> Your Account</div>
                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '> <BsBoxes className='text-xl text-gray-700' />Your Products</div>
                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '><GoGitPullRequestDraft className='text-xl text-gray-700' /> Your Request</div>
                        <div className='mt-3 hover:bg-gray-200 transition flex gap-4 items-center p-2 '> <RiMessage2Line className='text-xl text-gray-700' />Your Message</div>
                        <div className='mt-1 hover:bg-gray-200 transition flex gap-4 items-center p-2 '><LuUpload className='text-xl text-gray-700' />  Post Product</div>
                        <div onClick={handleLogout} className='mt-1 hover:bg-gray-200 transition flex gap-4 items-center p-2 '><IoLogOutOutline className='text-xl text-gray-700' /> Logout</div>

                      </div>
                    </div>
                    {/* </div> */}
                  </>

                )}

                {isLoggingOut && (
                  <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs sm:max-w-sm md:max-w-md">
                      <p className="text-lg font-semibold text-gray-800">You are logging out...</p>
                      <div className="mt-4 animate-spin">
                        <FaSpinner className="text-purple-500 text-3xl mx-auto" />
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </>
          )}

        </div>
      </div>

    </>
  );
};

export default BottomHeader;
