import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductPageLinks from '../../components/layout/ProductPageLinks';

interface FormData {
  text: string;
  image: string; // This will be the URL or base64 representation of the image
  date : string;
}

const PostProduct: React.FC = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState<File | null>(null);
 

   const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //get the current date 
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        
        // Create a new object with form data
        const formData: FormData = {
            text,
            image: image ? URL.createObjectURL(image) : '', // Create a URL for the image
            date: formattedDate,
        };

         console.log('Form Submitted with:', { text, image });

        // Retrieve existing data from localStorage, or initialize an empty array
        let storedData: FormData[] = JSON.parse(localStorage.getItem('formData') || '[]');

          if (!Array.isArray(storedData)) {
            storedData = []; // If not an array, reset to an empty array
        }

        // Add new form data to the array
        storedData.push(formData);

        // Save the updated array back to localStorage
        localStorage.setItem('formData', JSON.stringify(storedData));

        // Reset the form after submission
        setText('');
        setImage(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
        <DashboardLayout> 
            <ProductPageLinks/>
            <div className="p-4 sm:mt-15 md:mt-15 ">
                <h2 className="text-xl font-semibold">Submit Your Details</h2>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Enter text</label>
                        <input type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className='mt-1 block w-full px-4 py-2 border rounded-md shadow-sm cus:outline-none focus:ring-2 focus:ring-indigo-500'
                            placeholder='Enter text'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 cursor-pointer'>Upload Image</label>
                        <input type="file"
                            onChange={handleImageChange}
                            className='mt-1 block w-full'
                            accept="image/*"
                        />
                    </div>

                       <form onSubmit={handleSubmit} className='mt-4'>
                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 focus:outline-none cursor-pointer"
                    >
                        Submit
                    </button>
                </form>

                {/* <button
                    onClick={() => window.location.href = '/myproducts'}
                    className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700 focus:outline-none"
                >
                    Show Details
                </button> */}
            </div>
            </DashboardLayout>
        </>
    )
}

export default PostProduct
