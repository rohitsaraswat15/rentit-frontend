import React from 'react';

interface ItemProps {
    icon: React.ReactNode;
    title: string;
    onDelete?: () => void;
}

const Item: React.FC<ItemProps> = ({ icon, title, onDelete }) => {
    return (
        <div className="relative flex flex-col items-center border border-gray-300 bg-white shadow-lg rounded-xl p-1 w-full max-w-xs transition hover:shadow-lg">
            {/* Icon */}
            <div className="w-full h-50 flex items-center justify-center rounded-lg mb-3 text-black text-8xl">
                {icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center text-gray-800">{title}</h2>

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

export default Item;
