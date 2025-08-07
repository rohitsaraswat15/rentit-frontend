import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface FormData {
  text: string;
  image: string; // This will be the URL or base64 representation of the image
}

const PostProduct: React.FC = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        //create a new object with form data
        const formData : FormData = {
            text,
            image:image ?URL.createObjectURL(image): '', // Create a URL for the image (can be used for preview)
        };

        //store form data in localstorage
        localStorage.setItem('formData', JSON.stringify(formData));

        //navigate to the show form page
        navigate('/myProducts')

        //Reset the form after submission
        setText('')
        setImage(null)
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
        <DashboardLayout> 
            <div className="p-4">
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
                        <label className='block text-sm font-medium text-gray-700'>Upload Image</label>
                        <input type="file"
                            onChange={handleImageChange}
                            className='mt-1 block w-full'
                            accept="image/*"
                        />
                    </div>
                       <form onClick={handleSubmit} className='mt-4'>
                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
            </DashboardLayout>
        </>
    )
}

export default PostProduct
