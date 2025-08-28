import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductPageLinks from '../../components/layout/ProductPageLinks';
import { IoPlanetOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiRocketLaunchDuotone } from "react-icons/pi";



interface FormData {
  text: string;
  image: string; // This will be the URL or base64 representation of the image
  date: string;
}

const AdminBin: React.FC = () => {
  // Use FormData type instead of any
  const [deletedItems, setDeletedItems] = useState<FormData[]>([]);
  const [itemsToDelete, setItemsToDelete] = useState<FormData[]>([])
  const [showModal, setShowModal] = useState(false);
  const [targetedItem, setTargetedItem] = useState<FormData | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Retrieve deleted items from localStorage
    const items = localStorage.getItem('deletedItems');
    if (items) {
      setDeletedItems(JSON.parse(items));
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
    const itemsToBeDeleted = Array.from(selectedItems).map(index => deletedItems[index]);
    setItemsToDelete(itemsToBeDeleted); // Store selected items to delete
  };

  const confirmDelete = () => {
    // const remainingItems = formData.filter((_, index) => !selectedItems.has(index));

    // Remove selected item(specific) from formData
    if (targetedItem) {
      const remainingItems = deletedItems.filter(item => item !== targetedItem);
      // Update localStorage with remaining items
      localStorage.setItem('deletedItems', JSON.stringify(remainingItems));
      // Update state with remaining items
      setDeletedItems(remainingItems);
      setTargetedItem(null)
    }
    // Case 2: If there are selected checkboxes, delete those items
    else if (selectedItems.size > 0) {
      const remainingItems = deletedItems.filter((_, index) => !selectedItems.has(index));
      localStorage.setItem('deletedItems', JSON.stringify(remainingItems));
      setDeletedItems(remainingItems);
    }

    // Close the modal
    setShowModal(false);

    // Reset selected items state
    setSelectedItems(new Set());
    console.log(itemsToDelete)
  };

  const cancelDelete = () => {
    setShowModal(false);
  }

  return (
    <DashboardLayout>
      <ProductPageLinks />
      <div className="sm:mt-15 md:mt-15 overflow-x-hidden h-fit  ">
        <h2 className="text-xl font-semibold mb-4 ml-4">Deleted Products</h2>

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
            <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Relaunch</h4>
            <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Price</h4>
            <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Date</h4>
            <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Delete</h4>

          </div>
        </div>

        {deletedItems.length > 0 ? (
          deletedItems.map((item, index) => (
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
                  {item.image ? (
                    <div>
                      <img src={item.image} alt="Uploaded" className="w-full h-full object-cover rounded-sm" />
                    </div>
                  ) : (
                    <span className="text-center text-gray-500">Uploaded</span>
                  )}
                </div>

                <div className='flex flex-col gap-1 md:gap-3'>
                  <p className="text-md md:text-lg font-semibold text-gray-900">{item.text}</p>
                  <div className="md:hidden lg:hidden text-xs text-gray-500 w-full font-semibold items-center justify-center m-auto">{item.date}</div>
                  <p className="text-xs text-gray-500">Product description to be written here.Available in three colors.Instant delivery.</p>
                  <button
                    className="bg-purple-500 cursor-pointer text-white w-fit px-4 py-2 rounded-sm hidden sm:block md:block"
                  >
                    Review
                  </button>

                </div>
              </div>

              <div className='text-gray-700 absolute m-auto w-fit h-full sm:flex md:flex hidden items-end justify-end right-0'>
               <div className='border-l-2 font-bold border-gray-200 p-8 h-full cursor-pointer w-fit flex items-center justify-center m-auto right-0'>
              <PiRocketLaunchDuotone size={40} className='bg-green-300 rounded-full p-2' />
                                 </div>
                <div className="text-sm text-gray-900 border-l-2 border-gray-200 p-6 h-full flex items-center justify-center">₹ 250/month</div>
                <div className="text-sm text-gray-900 border-l-2 border-gray-200 p-6 h-full flex items-center justify-center">{item.date}</div>

                <div
                  onClick={() => handleDeleteClick(item)}
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
              <h3 className="text-md text-gray-500 text-center">Currently here is no deleted products. </h3>

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
      
                    <h3 className="text-lg mb-4 mt-6 font-semibold text-center">You are about to delete this product</h3>
                    <h3 className="text-sm text-gray-500 text-center">This will permanently delete your product from the user's account.This process cannot be undone.</h3>
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
  );
};

export default AdminBin;
