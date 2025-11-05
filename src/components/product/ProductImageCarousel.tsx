import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import type { FormData } from "../../types/postTypes";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import { useAuthContext } from "../../context/useAuthContext";
import { FaRegSmileBeam } from "react-icons/fa";
import { MdNotInterested } from "react-icons/md";


const ProductCard = () => {
    const [formData, setFormData] = useState<FormData[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<FormData | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>();
    const [warningMessage, setWarningMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const isSelected = (img: string) => img === selectedImage;
    const { sendNotification } = useNotificationContext();
    const { user } = useAuthContext();

    const handleRentit = () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }

        if (!selectedProduct) return; // No product selected

        // Normalize IDs as strings and trim whitespace
        const currentUserId = String(user.id).trim();

        // 🔹 Detect the correct owner field safely
        const ownerId = String(
            selectedProduct.userid ??
            selectedProduct.userid ??
            ""
        ).trim();

        console.log("Current userId:", currentUserId, "OwnerId:", ownerId, "Full product:", selectedProduct);

        // Prevent user from requesting their own product
        if (currentUserId && ownerId && currentUserId === ownerId) {
            setWarningMessage(true);
            return;
        }

        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-IN", {
            weekday: "long", // e.g. Tuesday
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const formattedTime = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        // Proceed with sending notification
        const newNotification = {
            id: Date.now().toString(),
            senderId: currentUserId,
            senderName: user.name,
            receiverId: ownerId,
            receiverName: selectedProduct.postedBy || "Unknown",
            productId: selectedProduct.id,
            productTitle: selectedProduct.pname,
            productAmount: selectedProduct.pamount,
            productImage: Array.isArray(selectedProduct.image)
                ? selectedProduct.image[0]
                : selectedProduct.image,
            timestamp: Date.now(),
            status: "pending" as const,
            message: `${user.name} wants to get your product "${selectedProduct.pname}"`,
            read: false,
            date: formattedDate,
            time: formattedTime,
        };

        sendNotification(newNotification);
        setSuccessMessage(true);
    };

    // Load data from localStorage
    useEffect(() => {
        const loadAllPosts = () => {
            const allKeys = Object.keys(localStorage);
            const allUserPosts: FormData[] = [];

            allKeys.forEach((key) => {
                if (key.startsWith("formData_")) {
                    const userData = JSON.parse(localStorage.getItem(key) || "[]");
                    if (Array.isArray(userData)) {
                        allUserPosts.push(...userData);
                    }
                }
            });

            setFormData(allUserPosts);
        };

        loadAllPosts(); // initial load

        // Listen for updates triggered from PostProduct/MyProducts
        window.addEventListener("storageUpdate", loadAllPosts);

        return () => {
            window.removeEventListener("storageUpdate", loadAllPosts);
        };
    }, []);

    useEffect(() => {
        if (selectedProduct?.image && selectedProduct.image.length > 0) {
            setSelectedImage((prev) => prev || selectedProduct.image[0]);
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProduct]);

    const openModal = (product: FormData) => {
        setSelectedProduct(product);
        setSelectedImage(
            product.image && product.image.length > 0 ? product.image[0] : ""
        );
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setSuccessMessage(false);
        setWarningMessage(false);
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);


    return (
        <>
            <section className="p-4 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {formData.map((product, index) => {
                        // Split description for preview
                        const sentences = product.pdetails
                            .split(".")
                            .map((s) => s.trim())
                            .filter((s) => s !== "");
                        const mainDescription =
                            sentences.slice(0, 1).join(". ") +
                            (sentences.length >= 2 ? "." : "");

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                            >
                                <img
                                    src={product.image[0]}
                                    alt={product.pname}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                                            {product.pname}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{mainDescription}</p>
                                        <p className="text-gray-600 text-md mt-2 font-bold ">
                                            {product.postedBy}
                                        </p>
                                        <p className="text-gray-600 text-md mt-2 font-bold">
                                            {product.date}
                                        </p>
                                        <p className=" text-lg mt-2 font-bold text-green-600">
                                            Price : {product.pamount}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="w-1/2 px-3 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                                        >
                                            View Details
                                        </button>
                                        <button className="w-1/2 px-3 py-2 text-sm font-semibold text-purple-600 border border-purple-600 hover:bg-indigo-100 rounded-lg transition">
                                            Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Modal */}
            {selectedProduct && (
                <div className="fixed overflow-y-scroll scroll inset-0 backdrop-brightness-20 flex items-center justify-center z-50 p-4 m-auto">
                    <div className="bg-white rounded-xl border-2 border-gray-300 shadow-lg max-w-2xl w-full relative p-4 sm:m-auto md:mt-10">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-600 text-2xl"
                            onClick={closeModal}
                        >
                            <IoCloseCircle />
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mt-4">
                            {selectedProduct.pname}
                        </h2>
                        <h2 className="text-gray-600 text-md mt-2 font-bold ">
                            {selectedProduct.postedBy}
                        </h2>

                        <div className="flex flex-col sm:flex gap-6 mt-2 w-full md:flex-row lg:flex-row">
                            <div className="flex flex-col w-full sm:w-fit h-fit m-auto md:ml-0 md:w-150">
                                <img
                                    src={selectedImage}
                                    alt={selectedProduct.pname}
                                    className="h-50 w-50 object-cover rounded-md sm:h-60 sm:w-60 mx-auto"
                                />
                                <div className="flex w-fit sm:w-full justify-start m-auto mt-2 sm:flex md:flex-row md:w-fit md:m-auto">
                                    {selectedProduct.image?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            className={`h-20 w-20 object-cover rounded-xl sm:h-18 sm:w-18 cursor-pointer p-1 transition-all duration-300 ease-in-out ${isSelected(img)
                                                ? "border-4 border-purple-400 opacity-50"
                                                : ""
                                                }`}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col w-full sm:w-fit mt-1 sm:mt-0 md:w-full md:p-5 sm:p-5">
                                <h2 className="text-gray-600 text-xl mt-2 font-bold">Rent</h2>
                                <p className="text-2xl font-bold text-black mt-1">
                                    {selectedProduct.pamount}
                                </p>
                                <button onClick={handleRentit} className="bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white px-4 py-2 mt-3 w-full sm:w-full md:w- cursor-pointer">
                                    RentIt
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white px-4 py-2 mt-3 w-full sm:w-auto cursor-pointer">
                                    Send Message
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 rounded-lg transition-all text-white px-4 py-2 mt-3 w-full sm:w-auto cursor-pointer">
                                    Send Enquiry
                                </button>
                            </div>
                        </div>

                        {successMessage && (
                            <div className="fixed inset-0 backdrop-brightness-35 flex items-center justify-center p-4 z-50">
                                <div className="bg-white relative w-full sm:w-110 md:w-1/3 lg:w-1/4 h-auto p-8 rounded-lg border-t-5 border-green-400 shadow-md flex flex-col items-center justify-center">

                                    <button
                                        className="absolute top-3 right-3 text-gray-300 hover:text-gray-400 text-2xl"
                                        onClick={closeModal}
                                    >
                                        <IoCloseCircle />
                                    </button>

                                    <div className="flex items-center justify-center m-auto p-3 w-full">
                                        <div className={`rounded-full p-2 overflow-hidden flex items-center border-2 border-green-400 justify-center text-white font-bold`}>
                                            <FaRegSmileBeam className='text-green-400' size={50} />
                                        </div>
                                    </div>

                                    <h3 className="text-xl mb-4 mt-6 font-semibold text-center">Success!</h3>
                                    <h3 className="text-xl mb-4 mt-6 font-semibold text-center">Your Rent Request for {selectedProduct.pname} has sent successfully. </h3>
                                </div>
                            </div>
                        )}

                        {warningMessage && (
                            <div className="fixed inset-0 backdrop-brightness-35 flex items-center justify-center p-4 z-50">
                                <div className="bg-white relative w-full sm:w-110 md:w-1/3 lg:w-1/4 h-auto p-8 rounded-lg border-t-5 border-red-400 shadow-md flex flex-col items-center justify-center">

                                    <button
                                        className="absolute top-3 right-3 text-gray-300 hover:text-gray-400 text-2xl"
                                        onClick={closeModal}
                                    >
                                        <IoCloseCircle />
                                    </button>

                                    <div className="flex items-center justify-center m-auto p-3 w-full">
                                        <div className={`rounded-full p-2 overflow-hidden flex items-center border-2 border-red-400 justify-center text-white font-bold`}>
                                            <MdNotInterested className='text-red-400' size={50} />
                                        </div>
                                    </div>

                                    <h3 className="text-xl mb-4 mt-6 font-semibold text-center">Warning!</h3>
                                    <h3 className="text-xl mb-4 mt-6 font-semibold text-center">You can't request your own product. </h3>
                                </div>
                            </div>

            )}

                        <h2 className="text-gray-600 text-xl mt-4 font-bold ">
                            Product Details
                        </h2>

                        {/* Split description inside modal */}
                        {(() => {
                            const sentences = selectedProduct.pdetails
                                .split(".")
                                .map((s) => s.trim())
                                .filter((s) => s !== "");
                            const mainDescription =
                                sentences.slice(0, 2).join(". ") +
                                (sentences.length >= 2 ? "." : "");
                            const moreDetails = sentences.slice(2);

                            return (
                                <>
                                    <p className="text-gray-700 mt-2">{mainDescription}</p>
                                    {moreDetails.length > 0 && (
                                        <div className="w-full mr-6 mt-4">
                                            <h3 className="text-lg font-semibold mb-2">
                                                More Details
                                            </h3>
                                            <ul className="list-disc pl-6 text-gray-600 text-left space-y-2">
                                                {moreDetails.map((detail, index) => (
                                                    <li key={index}>{detail}.</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

        </>
    );
};

export default ProductCard;
