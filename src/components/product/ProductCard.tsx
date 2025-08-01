import React from 'react';

interface ItemProps {
    icon: React.ReactNode;
    title: string;
    onDelete?: () => void;
}

const ProductCard: React.FC<ItemProps> = ({ icon, title, onDelete }) => {
    return (
        <div className="relative flex flex-col items-center border border-gray-300 bg-white shadow-lg rounded-xl p-1 w-full max-w-xs transition hover:shadow-lg mt-2 sm:mt-4 md:mt-8">
            {/* Icon */}
            <div className="w-full h-20 flex items-center justify-center rounded-lg mb-1 text-black text-5xl md:text-7xl">
                {icon}
            </div>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-center text-gray-800">{title}</h2>

            {/* Delete Button (only for admin) */}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute top-4 right-4 bg-gray-400 text-white rounded-full px-2 py-1 text-sm hover:bg-gray-500"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default ProductCard;
