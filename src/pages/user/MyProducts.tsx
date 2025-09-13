import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductPageLinks from '../../components/layout/ProductPageLinks';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsLightningCharge } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoPlanetOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


interface FormData {
  pname: string;
  image: string[];
  date: string;
  postedBy: string;
  pamount: string;
  ptime: string;
}

const MyProducts: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [showModal, setShowModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<FormData[]>([])
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null); // Track the active item for mobile menu
  const [targetedItem, setTargetedItem] = useState<FormData | null>(null);
  const threedotRef = useRef<HTMLDivElement | null>(null);
  // const [user, setUser] = useState<{ name: string; role: string } | null>(null);


  // useEffect(() => {
  //   const updateUser = () => {
  //     const storedUser = localStorage.getItem('user');
  //     setUser(storedUser ? JSON.parse(storedUser) : null);
  //   };

  //   //update your user log out info in different tab or window 
  //   window.addEventListener('storage', updateUser);
  //   updateUser();

  //   //prevents memory leaks
  //   return () => window.removeEventListener('storage', updateUser);
  // }, []);

  useEffect(() => {
    // Retrieve form data from localStorage
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleCheckboxChange = (index: number) => {
    const updatedSelection = new Set(selectedItems);
    if (updatedSelection.has(index)) {
      updatedSelection.delete(index);
    } else {
      updatedSelection.add(index);
    }
    setSelectedItems(updatedSelection);
  }

  const handleDeleteClick = (item: FormData) => {
    setTargetedItem(item); // Set the targeted item for deletion
    setShowModal(true); // Open the modal
    setItemsToDelete([item]); // Store the item to be deleted

    // If multiple items are selected, store them in itemsToDelete
    const itemsToBeDeleted = Array.from(selectedItems).map(index => formData[index]);
    setItemsToDelete(itemsToBeDeleted); // Store selected items to delete
  };

  const confirmDelete = () => {
    // const remainingItems = formData.filter((_, index) => !selectedItems.has(index));

    // Remove selected item(specific) from formData
    if (targetedItem) {
      const remainingItems = formData.filter(item => item !== targetedItem);
      // Update localStorage with remaining items
      localStorage.setItem('formData', JSON.stringify(remainingItems));
      // Update state with remaining items
      setFormData(remainingItems);
      setTargetedItem(null)
    }
    // Case 2: If there are selected checkboxes, delete those items
    else if (selectedItems.size > 0) {
      const remainingItems = formData.filter((_, index) => !selectedItems.has(index));
      localStorage.setItem('formData', JSON.stringify(remainingItems));
      setFormData(remainingItems);
    }

    // Close the modal
    setShowModal(false);

    // Reset selected items state
    setSelectedItems(new Set());

    // Retrieve existing deleted items from localStorage
    const existingDeletedItems = JSON.parse(localStorage.getItem('deletedItems') || '[]');

    // Append the new deleted items to the existing ones
    const updatedDeletedItems = [
      ...existingDeletedItems,
      ...itemsToDelete,
      ...(targetedItem ? [targetedItem] : []),
    ];
    // Store updated deleted items back in localStorage
    localStorage.setItem('deletedItems', JSON.stringify(updatedDeletedItems));
  };

  const cancelDelete = () => {
    setShowModal(false);
  }

  // Toggle the mobile menu for a specific item
  const toggleMobileMenu = (index: number) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index); // Close if the same item is clicked
  };

  //detects outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (threedotRef.current && !threedotRef.current.contains(e.target as Node)) {
        setActiveMenuIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <DashboardLayout>
        <ProductPageLinks />
        <div className="sm:mt-15 md:mt-15 overflow-x-hidden h-fit  ">
          <h2 className="text-xl font-semibold mb-4 ml-4">Submitted Details</h2>

          <div className='relative border-t-2 border-b-2 font-semibold border-gray-300 w-full p-4 text-gray-600 sm:block md:block lg:block hidden'>

            <div className='absolute left-0 p-3 text-gray-700 top-2 ml-4 flex items-center justify-center'>
              <input
                type='checkbox'
                className='w-4 h-4'
              />
            </div>

            <div>
              <h4 className='md:ml-15'>Products</h4>
            </div>

            <div className='absolute w-fit h-full flex top-0 gap-6 items-end justify-end right-0 text-md mr-4'>
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Price</h4>
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Boost</h4>
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Date</h4>
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Delete</h4>

            </div>
          </div>

          {formData.length > 0 ? (
            formData.map((data, index) => (
              <div key={index} className="relative flex gap-3 border-b-2 border-gray-300 hover:bg-gray-100">

                <div className='border-r-2 border-gray-300 ml-4 text-gray-700 p-3 items-center justify-center sm:block md:block lg:block hidden'>
                  <input
                    type='checkbox'
                    className='w-4 h-4'
                    checked={selectedItems.has(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>

                <div className='flex gap-2 md:gap-6 lg:gap-6 w-xl py-2 px-6'>
                  <div className="w-50 h-20 md:w-45 md:h-38 flex items-center justify-center">
                    {data.image ? (
                      <img
                        src={data.image[0]}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-sm"
                      />
                    ) : (
                      <span className="text-center text-gray-500">Uploaded</span>
                    )}
                  </div>

                  <Link to={`/productDetails/${index}`}> <div className='flex flex-col gap-1 md:gap-2'>
                    <p className="text-md md:text-lg font-semibold text-gray-900">{data.pname}</p>
                    <p className="text-sm md:text-md font-bold text-gray-800"><span className='text-sm md:text-sm text-green-600'>Owner :</span> {data.postedBy}</p>
                    <div className="md:hidden lg:hidden text-xs text-gray-500 w-full font-semibold items-center justify-center m-auto">{data.date}</div>
                    <p className="text-xs text-gray-500">Product description to be written here.Available in three colors.Instant delivery.</p>
                    <div className='md:hidden sm:hidden lg:hidden font-bold h-full cursor-pointer w-full items-end justify-end right-0'>
                      <button className='bg-green-300 w-full mt-2 px-4 py-2 text-md font-semibold text-gray-900'>Boost</button>
                    </div>

                    <Link to={`/productDetails/${index}`}> <button
                      className="bg-purple-500 cursor-pointer text-white w-fit px-4 py-2 rounded-sm hidden sm:block md:block"
                    >
                      View Details
                    </button>
                    </Link>

                  </div>
                  </Link>
                </div>

                <div className="md:hidden block">
                  <button
                    onClick={() => toggleMobileMenu(index)}
                    className="text-gray-500 focus:outline-none cursor-pointer items-end mr-4 mt-4"
                  >
                    {activeMenuIndex === index ? <BiDotsVerticalRounded size={21} /> : <BiDotsVerticalRounded size={21} />}
                  </button>
                </div>

                {/* Menu for delete- only on mobile */}
                {activeMenuIndex === index && (
                  <div ref={threedotRef} className="absolute top-5 right-10 border-2 border-gray-200 bg-white w-40 rounded-md p-4 flex flex-col gap-4 z-10 md:hidden">
                    <button

                      onClick={() => handleDeleteClick(data)}
                      className="text-gray-900 flex items-center gap-2 cursor-pointer transition  hover:bg-gray-400"
                    >
                      <RiDeleteBin6Line size={18} />
                      Delete
                    </button>
                  </div>
                )}



                <div className='text-gray-700 absolute m-auto w-fit h-full sm:flex md:flex hidden items-end justify-end right-0'>

                  <div className="text-sm text-gray-900 border-l-2 border-gray-200 p-6 h-full flex items-center justify-center">₹ {data.pamount}/{data.ptime}</div>

                  <div className='border-l-2 font-bold border-gray-200 p-8 h-full cursor-pointer w-fit flex items-center justify-center m-auto right-0'>
                    <BsLightningCharge size={40} className='bg-green-300 rounded-full p-2' />
                  </div>

                  <div className="text-sm text-gray-900 border-l-2 border-gray-200 p-6 h-full flex items-center justify-center">{data.date}</div>

                  <div
                    onClick={() => handleDeleteClick(data)}
                    className="hidden sm:flex md:flex border-l-2 cursor-pointer border-gray-200 p-8 h-full w-fit items-center justify-center m-auto mr-4"
                  >
                    <RiDeleteBin6Line size={21} />
                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="relative md:left-1/10 w-full md:w-1/2 lg:w-1/2 h-auto p-6 flex flex-col items-center justify-center">

                <div className="flex items-center justify-center m-auto p-3 w-full">
                  <div className={`rounded-full p-6 bg-gray-100 overflow-hidden flex items-center justify-center text-white font-bold`}>
                    <IoPlanetOutline className='text-purple-500' size={100} />
                  </div>
                </div>

                <h3 className="text-xl mb-4 mt-4 font-semibold text-center">Nothing to show.</h3>
                <h3 className="text-md text-gray-500 text-center">Currently you don't have any active product. Click here to post your product. </h3>
                <Link to='/postproduct'> <button
                  className="bg-purple-500 cursor-pointer mt-6 text-white w-fit px-4 py-2 rounded-sm sm:block md:block"
                >
                  Post Product
                </button></Link>

              </div>
            </div>

          )}


        </div>



        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-brightness-35 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full sm:w-110 md:w-1/3 lg:w-1/4 h-auto p-8 rounded-lg border-t-5 border-red-400 shadow-md flex flex-col items-center justify-center">


              <div className="flex items-center justify-center m-auto p-3 w-full">
                <div className={`rounded-full p-2 overflow-hidden flex items-center border-2 border-red-400 justify-center text-white font-bold`}>
                  <RxCross2 className='text-red-400' size={40} />
                </div>
              </div>

              <h3 className="text-lg mb-4 mt-6 font-semibold text-center">You are about to delete your product</h3>
              <h3 className="text-sm text-gray-500 text-center">This will permanently delete your product from the account.This process cannot be undone.</h3>
              <h3 className="text-sm text-gray-500 text-center">Are you sure you want to delete this?</h3>

              <div className="flex gap-10 mt-8 w-full justify-center">
                <button
                  onClick={cancelDelete}
                  className="bg-gray-100 hover:bg-gray-200 border-purple-500 border-2 text-purple-500 px-6 py-2 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-6 py-2 rounded-sm cursor-pointer hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}


      </DashboardLayout>
    </>
  );
};

export default MyProducts;
