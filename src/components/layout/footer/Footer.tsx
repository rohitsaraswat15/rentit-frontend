import React from 'react';
import { FaRegCopyright } from "react-icons/fa";
 
import ItemsContainer from './ItemsContainer';
import SocialIcons from './SocialIcons';
import { Icons } from './Menus';


const Footer: React.FC = () => {
  return (
    <>
      <footer className='bg-gray-900 text-white'>
        <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7 '>
          <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5'>
            <span className='text-teal-400'>Free</span> until you're ready to <br></br>
            launch
          </h1>

          <div>
            <input type="text" placeholder='Enter Your Phone Number'
              className='bg-white text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none'
            />
            <button className='bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[poping] rounded-md text-white md:w-auto w-full '>
              Send
            </button>
          </div>
        </div>
        <ItemsContainer />
     
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8'>
          <span className='flex gap-2 top-0 items-center justify-center'><FaRegCopyright className='mt-1'/> 2025-2026 | RentIt.in, Inc. or its affiliates</span>
          <SocialIcons Icons={Icons} />
        </div>

      </footer>
    </>
  );
};

export default Footer;
