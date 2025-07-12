import React from 'react';
import googleLogo from './../assets/google_logo.png';

const GoogleLoginButton: React.FC = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full gap-3 py-2 px-4 mt-5 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 transition duration-200"
    >
      <img
        src={googleLogo}
        alt="Google Logo"
        className="w-5 h-5"
      />
      <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
