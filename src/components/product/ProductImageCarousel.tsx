import headphone from '../../assets/illustrations/headphone.jpg'
import headphone2 from '../../assets/illustrations/headphone2.jpg'
import headphone3 from '../../assets/illustrations/headphone3.jpg'
import iphone from '../../assets/illustrations/iphone.webp'
import macbook from '../../assets/illustrations/macbook.png'
import ac from '../../assets/illustrations/ac.jpg'
import { useState, useEffect } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import ReviewCard from '../common/ReviewCard'

const products = [
    {
        id: 1,
        title: "Smart Headphones",
        description: "Noise-cancelling over-ear headphones with long battery life.",
        image: headphone,
        extraImages: [
            headphone,
            headphone2,
            headphone3
        ],
        handle: "@tanmay",
        price: "₹500/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.Noise-cancelling over-ear headphones with long battery life. Made from eco-friendly materials. Available in multiple colors.",
    },
    {
        id: 2,
        title: "iPhone 15",
        description: "Ready to use iPhone 15 with updated version and amazing camera quality ",
        image: iphone,
        extraImages: [
            iphone,
            headphone2,
            headphone3
        ],
        handle: "@grik",
        price: "₹7500/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.Made from eco-friendly materials. Available in multiple colors.Made from eco-friendly materials. Available in multiple colors.",
    },
    {
        id: 3,
        title: "Macbook",
        description: "Fast charging macbook with LED indicators on keyboard and sleek design.",
        image: macbook,
        extraImages: [
            macbook,
            headphone2,
            headphone3
        ],
        handle: "@rohit",
        price: "₹10000/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.",
    },
    {
        id: 4,
        title: "AC",
        description: "Smart AC available. Track your cooling of the room and stay connected on the go.",
        image: ac,
        extraImages: [
            ac,
            headphone2,
            headphone3
        ],
        handle: "@tanmay",
        price: "₹5000/month",
        extraInfo: "Made from eco-friendly materials. Available in multiple colors.",
    },
];

const reviewData = {
    name: 'John Doe',
    review: 'The service was excellent, I\'m very happy with the product!',
    initialStars: 5,
};

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    extraImages: string[],
    extraInfo: string;
    price: string;
    handle: string;
}
const ProductImageCarousel = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>();
    const isSelected = (img: string) => img === selectedImage;

    // Function to convert text into bullet points
    const convertTextToBulletPoints = (text: string) => {
        const sentences = text.split('.').map(sentence => sentence.trim()).filter(sentence => sentence !== '');
        return sentences;
    };

    // If a product is selected, process its description
    const bulletPoints = selectedProduct ? convertTextToBulletPoints(selectedProduct.extraInfo) : [];

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setSelectedImage(product.extraImages && product.extraImages.length > 0 ? product.extraImages[0] : product.image);

    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden'; // Disable body scroll when modal is open
        } else {
            document.body.style.overflow = ''; // Re-enable body scroll when modal is closed
        }

        return () => {
            document.body.style.overflow = ''; // Cleanup on component unmount
        };
    }, [selectedProduct]);

    return (
        <>
            <section className="p-4 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
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
                <div className="fixed overflow-y-scroll scroll inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 m-auto">

                    <div className="bg-white rounded-xl border-2 border-gray-300 shadow-lg max-w-2xl w-full relative p-4 sm:m-auto md:mt-10 m-auto md:m-auto lg:m-auto">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-500 text-2xl"
                            onClick={closeModal}
                        >
                            <IoCloseCircle />
                        </button>
                        {/* Modal Content */}
                        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mt-4">{selectedProduct.title}</h2>
                        <h2 className="text-gray-600 text-md mt-2 font-bold ">{selectedProduct.handle}</h2>

                        <div className=" flex flex-col sm:flex gap-6 mt-2 w-full md:flex-row lg:flex-row">
                            <div className="flex flex-col w-full sm:w-fit h-fit m-auto md:ml-0 md:w-150">
                                <img
                                    src={selectedImage}
                                    alt={selectedProduct.title}
                                    className="h-50 w-50 object-cover rounded-md sm:h-60 sm:w-60 mx-auto"
                                />
                                <div className="flex w-fit sm:w-full justify-start m-auto mt-2 sm:flex md:flex-row md:w-fit md:m-auto">
                                    {selectedProduct.extraImages?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            className={`h-20 w-20 object-cover rounded-xl sm:h-18 sm:w-18 cursor-pointer p-1 transition-all duration-300 ease-in-out ${isSelected(img) ? 'border-4 border-purple-400 opacity-50' : ''
                                                }`}
                                            onClick={() => setSelectedImage(img)} // Update the main image when clicked
                                        />
                                    ))}
                                </div>

                            </div>

                            <div className="flex flex-col w-full sm:w-fit mt-1 sm:mt-0 md:w-full md:p-5 sm:p-5">
                                <h2 className="text-gray-600 text-xl mt-2 font-bold">Rent</h2>
                                <p className="text-2xl font-bold text-black mt-1">{selectedProduct.price}</p>
                                <button className="bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white px-4 py-2 mt-3 w-full sm:w-full md:w-full">
                                    RentIt
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white px-4 py-2 mt-3 w-full sm:w-auto">
                                    Send Message
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white px-4 py-2 mt-3 w-full sm:w-auto">
                                    Send Enquiry
                                </button>
                            </div>
                        </div>

                        <h2 className="text-gray-600 text-xl mt-4 font-bold ">Product Details</h2>
                        <p className="text-gray-700 mt-2">{selectedProduct.description}</p>

                        <ul className="list-disc pl-5">
                            {bulletPoints.map((point, index) => (
                                <li key={index} className="text-gray-800">{point}</li>
                            ))}
                        </ul>

                        <ReviewCard {...reviewData} />
                        <ReviewCard {...reviewData} />
                    </div >
                </div>
            )}

        </>
    );
};

export default ProductImageCarousel;
