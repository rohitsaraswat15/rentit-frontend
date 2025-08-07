import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for form data
interface FormData {
    text: string;
    image: string; // This will be the URL or base64 representation of the image
}

const FormPage: React.FC = () => {
    const [text, setText] = useState<string>('');  // Use type string for text
    const [image, setImage] = useState<File | null>(null); // Use File type for image
    const navigate = useNavigate();

    const terms = [
        { id: 1, label: 'Rentee must return the  product in original condition.', checked: true },
        { id: 2, label: 'Late return will incur aditional charges.', checked: false },
        { id: 3, label: 'Security deposit  is refundable only after inspection.', checked: true },
        { id: 4, label: 'No third party usage is allowed.', checked: false },
        { id: 5, label: 'In case of damage, rentee will  bear the repair cost.', checked: true },
        { id: 6, label: 'The product must  be returned with all accessories.', checked: true },
        { id: 7, label: 'Add your own clause', checked: false }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent default form submission

        // Create a new object with form data, using the FormData interface
        const formData: FormData = {
            text,
            image: image ? URL.createObjectURL(image) : '', // Use object URL if an image is selected
        };

        // Store form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Navigate to the show form page
        navigate('/showform');

        // Reset the form after submission
        setText('');
        setImage(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]); // Type the file as a `File` object
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        <div className="flex gap-4 p-4">
            <h2 className="text-xl font-semibold">Product Listing Form</h2>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="flex gap-4 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Details</label>
                    <input
                        type="text"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    {/* dropdown */}
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>


                <label className="block text-sm font-medium text-gray-700">Brand/Model</label>
                <input
                    type="text"
                    value={text}
                    onChange={handleOnChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <h2 className="text-xl font-semibold">Availability</h2>
                <div className="flex gap-4 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rent Amount (per day/week/month)</label>
                    <input
                        type="text"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    {/* dropdown */}
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="text"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>


                <label className="block text-sm font-medium text-gray-700">Security Deposit</label>
                <input
                    type="text"
                    value={text}
                    onChange={handleOnChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <h2 className="text-xl font-semibold">Location</h2>
                <div className="flex gap-4 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pickup/Delivery Location</label>
                    <input
                        type="date"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    {/* dropdown */}
                    <label className="block text-sm font-medium text-gray-700">Time Duration Available</label>
                    <input
                        type="text"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <label className="block text-sm font-medium text-gray-700">Delivery</label>
                    <input
                        type="checkbox"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        name='I will Deliver'
                    />
                    <input
                        type="checkbox"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        name='Buyer must pick up'
                    />
                </div>

                <h2 className="text-xl font-semibold">Upload Images</h2>
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                        accept="image/*"
                    />
                </div>

                <input
                        type="checkbox"
                        value={text}
                        onChange={handleOnChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        name='Rental Agreement'
                    />
                 
                <h2 className="text-xl font-semibold">Terms</h2>
                <div className="space-y-4">
                    {terms.map((checkbox) => (
                        <div key={checkbox.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={checkbox.checked}
                                disabled
                                className="form-checkbox text-blue-500 h-5 w-5"
                            />
                            <label className="text-gray-700">{checkbox.label}</label>
                        </div>
                    ))}
                </div>





                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 focus:outline-none"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormPage;
