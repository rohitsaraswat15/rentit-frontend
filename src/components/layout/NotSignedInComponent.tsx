import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDoorOpen } from "react-icons/bi";
 
const NotSignedInComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 sm:px-6">
      {/* Illustration/Icon */}
      <div className="text-8xl text-yellow-400 mb-4">
        <BiSolidDoorOpen />
      </div>

      {/* Message */}
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
        You are not signed in
      </h2>

      {/* Short Message */}
      <p className="text-sm text-center text-gray-500 mb-4">
        Please sign in to access the content. It's quick and easy!
      </p>

      {/* Sign In Button */}
     <Link to='/login'> <button
        className="w-full px-6 py-4 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-300"
      >
        Sign In
      </button>
      </Link> 
    </div>
  );
};

export default NotSignedInComponent;
