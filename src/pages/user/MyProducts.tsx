import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductPageLinks from '../../components/layout/ProductPageLinks';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsLightningCharge } from "react-icons/bs";


interface FormData {
  text: string;
  image: string;
  date: string;
}

const MyProducts: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [showModal, setShowModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<FormData[]>([])


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

  const handleDeleteClick = () => {
    const items = formData.filter((_, index) => selectedItems.has(index));
    setItemsToDelete(items);
    setShowModal(true);
  }

  const confirmDelete = () => {
    // Remove selected items from formData
    const remainingItems = formData.filter((_, index) => !selectedItems.has(index));

    // Update localStorage with remaining items
    localStorage.setItem('formData', JSON.stringify(remainingItems));

    // Update state with remaining items
    setFormData(remainingItems);

    // Close the modal
    setShowModal(false);

    // Reset selected items state
    setSelectedItems(new Set());

    // Retrieve existing deleted items from localStorage
    const existingDeletedItems = JSON.parse(localStorage.getItem('deletedItems') || '[]');

    // Append the new deleted items to the existing ones
    const updatedDeletedItems = [...existingDeletedItems, ...itemsToDelete];

    // Store updated deleted items back in localStorage
    localStorage.setItem('deletedItems', JSON.stringify(updatedDeletedItems));
  };

  const cancelDelete = () => {
    setShowModal(false);
  }

  return (
    <>
      <DashboardLayout>
        <ProductPageLinks />
        <div className="sm:mt-15 md:mt-15  ">
          <h2 className="text-xl font-semibold mb-4 ml-4">Submitted Details</h2>

          <div className='relative border-t-2 border-b-2 font-semibold border-gray-300 w-full p-4 text-gray-600'>

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
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Boost</h4>
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Date</h4>
              <h4 className='text-gray-600 p-6 h-full flex items-center justify-center'>Delete</h4>

            </div>



          </div>

          {formData.length > 0 ? (
            formData.map((data, index) => (
              <div key={index} className="relative flex gap-3 border-b-2 border-gray-300 hover:bg-gray-100">

                <div className='border-r-2 border-gray-300 ml-4 text-gray-700 p-3 flex items-center justify-center'>
                  <input
                    type='checkbox'
                    className='w-4 h-4'
                    checked={selectedItems.has(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>

                <div className='border-r-2 border-gray-200 flex gap-6 w-xl py-2 px-4'>
                  {data.image && (
                    <div>
                      <img src={data.image} alt="Uploaded" className="w-38 h-38 object-cover rounded-sm flex items-center justify-center m-auto" />
                    </div>
                  )}
                  <div className='flex flex-col gap-2'>
                    <p className="text-lg font-semibold text-gray-900">{data.text}</p>
                    <p className="text-sm text-gray-500">Product description to be written here.Available in three colors.Instant delivery.</p>
                    <button
                      className="bg-purple-500 cursor-pointer text-white w-fit px-4 py-2 rounded-sm"
                    >
                      View Details
                    </button>

                  </div>


                </div>

                <div className='text-gray-700 absolute m-auto w-fit h-full flex items-end justify-end right-0'>

                  <div className='border-l-2 font-bold border-gray-200 p-8 h-full cursor-pointer w-fit flex items-center justify-center m-auto right-0'>
                    <BsLightningCharge size={40} className='bg-green-300 rounded-full p-2' />
                  </div>

                  <div className="text-sm text-gray-900 border-l-2 border-gray-200 p-6 h-full flex items-center justify-center">{data.date}</div>

                  <div onClick={handleDeleteClick} className='border-l-2 cursor-pointer border-gray-200 p-8 h-full w-fit flex items-center justify-center m-auto mr-4'>
                    <RiDeleteBin6Line size={21} />
                  </div>

                </div>

              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No data submitted yet.</p>
          )}
        </div>



        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl mb-4">Are you sure you want to delete the selected items?</h3>
              <div className="flex justify-between">
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-purple-500 text-white px-4 py-2 rounded-sm cursor-pointer"
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
