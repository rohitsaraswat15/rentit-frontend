import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';


interface ReviewCardProps {
    name: string;
    review: string;
    initialStars: number; // This will be the initial rating (e.g., 3, 4)
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name,review, initialStars }) => {
    // Generate an array of stars for visual representation
    const [rating, setRating] = useState<number>(initialStars);

    // Handle star click
    const handleStarClick = (index: number) => {
        setRating(index + 1); // Update the rating when a star is clicked
    };

    return (
        <div className="flex justify-start items-start p-4 mt-4">

            <div className="bg-white rounded-xl shadow-lg p-2 w-full sm:w-96 md:w-full lg:w-full xl:w-full">
                <div className="flex items-center mb-4">
                    <FaUser className="text-4xl text-gray-500 mr-4" />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-gray-900">{name}</p>
                    </div>
                </div>

                {/* Review Text Section */}
                <p className="text-left text-md font-medium text-gray-600 mb-4">{review}</p>

                {/* Stars Section (Clickable) */}
                <div className="flex justify-start mb-2">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            size={24}
                            className={`cursor-pointer mr-1 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} // Change color based on rating
                            onClick={() => handleStarClick(index)} // Set the rating on click
                        />
                    ))}
                </div>
                 </div>

            </div>
            );
};
export default ReviewCard;
