import headphone from '../../assets/illustrations/headphone.jpg'
import iphone from '../../assets/illustrations/iphone.webp'
import macbook from '../../assets/illustrations/macbook.png'
import ac from '../../assets/illustrations/ac.jpg'
import { useState} from 'react';
import { IoCloseCircle } from "react-icons/io5";

const products = [
    {
        id: 1,
        title: "Smart Headphones",
        description: "Noise-cancelling over-ear headphones with long battery life.",
        image: headphone,
        handle: "@tanmay",
        price: "₹500/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.",
    },
    {
        id: 2,
        title: "iPhone 15",
        description: "Ready to use iPhone 15 with updated version and amazing camera quality ",
        image: iphone,
        handle: "@grik",
        price: "₹7500/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.",
    },
    {
        id: 3,
        title: "Macbook",
        description: "Fast charging macbook with LED indicators on keyboard and sleek design.",
        image: macbook,
        handle: "@rohit",
        price: "₹10000/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.",
    },
    {
        id: 4,
        title: "AC",
        description: "Smart AC available. Track your cooling of the room and stay connected on the go.",
        image: ac,
        handle: "@tanmay",
        price: "₹5000/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.",
    },
];

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  extraInfo: string;
  price: string;
}
const ProductImageCarousel = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };
    return (
        <>
            <section className="p-4 lg:p-8 bg-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{product.description}</p>
                                    <p className="text-gray-600 text-md mt-2 font-bold ">{product.handle}</p>
                                    <p className=" text-lg mt-2 font-bold text-green-600">Price : {product.price}</p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button onClick={() => openModal(product)} className="w-1/2 px-3 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                                        View Details
                                    </button>
                                    <button className="w-1/2 px-3 py-2 text-sm font-semibold text-purple-600 border border-purple-600 hover:bg-indigo-100 rounded-lg transition">
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-500 text-2xl"
                            onClick={closeModal}
                        >
                            <IoCloseCircle />
                        </button>
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative p-6 m-4">
                        {/* Modal Content */}
                        
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="h-48 w-full object-cover rounded-md"
                        />
                        <h2 className="text-xl font-bold mt-4">{selectedProduct.title}</h2>
                        <p className="text-gray-700 mt-2">{selectedProduct.description}</p>
                        <p className="text-sm text-gray-500 mt-2">{selectedProduct.extraInfo}</p>
                        <p className="text-lg font-semibold text-green-600 mt-3">{selectedProduct.price}</p>

                        <div className="flex justify-end mt-4 gap-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
                            <button
                                onClick={closeModal}
                                className="border border-gray-400 px-4 py-2 rounded text-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ProductImageCarousel;
