import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductPageLinks from "../../components/layout/ProductPageLinks";
import { useParams, Link } from "react-router-dom";
import { CiShare2 } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { terms } from "../user/constant/Terms";
import { PiChatCircleDotsLight } from "react-icons/pi";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import Review from "../../components/layout/Review";

interface FormData {
  pid: number;
  pname: string;
  pdetails: string;
  pcategory: string;
  pamount: string;
  pbrandmodel: string;
  ptime: string;
  psecurityDeposit: string;
  pdlocation: string;
  pddate: string;
  pdtime: string;
  pdelivery: string;
  pstate: string;
  pcity: string;
  image: string[]; // This will be the URL or base64 representation of the image
  pagreement: boolean;
  pownClausecheckbox: string;
  pownClause: string;
  date: string;
  postedBy: string;
  pfinalAgreement: boolean;
}

const defaultDetails = [
  { key: "pbrandmodel", label: "Brand/ Model", type: "text" },
  { key: "pdlocation", label: "Delivery Location", type: "text" },
  { key: "pddate", label: "Delivery Date", type: "date" },
  { key: "pdtime", label: "Time Duration", type: "time" },
  { key: "pdelivery", label: "Delivery", type: "text" },
  { key: "pstate", label: "State", type: "text" },
  { key: "pcity", label: "City", type: "text" },
]

const ProductDetails: React.FC = () => {
  const { pid } = useParams<{ pid: string }>();
  const products: FormData[] = JSON.parse(localStorage.getItem("formData") || "[]");
  const product = pid ? products[Number(pid)] : null;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [liked, setLiked] = useState(false);


  const toggleSave = () => {
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    if (product?.image && product.image.length > 0) {
      setSelectedImage((prev) => prev || product.image[0]);
    }
  }, [product]);

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  const isSelected = (img: string) => img === selectedImage;
  const description = product.pdetails;

  // Split by '.' and clean up
  const sentences = description.split('.').map(s => s.trim()).filter(s => s !== "");

  // First 3 sentences for main description
  const mainDescription = sentences.slice(0, 2).join('. ') + (sentences.length >= 2 ? '.' : '');

  // Remaining sentences for bullet points
  const moreDetails = sentences.slice(2);

  const productId = pid ? Number(pid) : NaN;  // Convert string to number
  if (isNaN(productId)) {
    return <div>Invalid Product ID</div>;  // Handle invalid product ID
  }

  return (
    <>
      <DashboardLayout>
        <ProductPageLinks></ProductPageLinks>

        <div className="flex gap-5 mt-2 md:mt-15 p-2">
          <Link to="/myproducts" >
            <IoChevronBackCircleOutline size={25} className="text-gray-800" />
          </Link>
          <h1 className="text-gray-600 text-semibold">{product.pcategory}</h1>
        </div>

        <div className="max-w-full md:mx-auto flex flex-col px-6 ">

          <div className="md:max-w-full relative  md:mx-auto flex flex-col md:flex-row p-3 md:p-6 overflow-hidden">

            <div className="flex-col w-full md:w-2xl">
              <div className="flex gap-3 mb-6 h-fit md:ml-30 ">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex items-center bg-red-400 justify-center text-white font-bold text-xl"
                >
                  {product.postedBy
                    .split(" ")
                    .map((word, index, arr) =>
                      index === 0 || index === arr.length - 1 ? word.charAt(0) : ""
                    )
                    .join("")}
                </div>
                <div className="flex flex-col">
                  <h2>{product.postedBy}</h2>
                  <p className="text-xs text-gray-500">{product.date}</p>
                </div>

              </div>

              <div className="flex gap-4">
                {/* Thumbnails */}
                {product.image.length > 1 && (
                  <div className="flex flex-col gap-2 md:mr-4 md:w-auto">
                    {product.image.slice(0, 4).map((img, index) => (
                      <img
                        key={`${img}-${index}`}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`w-12 h-12 md:h-15 md:w-15 object-cover rounded-sm cursor-pointer transition-all duration-300 ${isSelected(img) ? "border-4 border-purple-500 opacity-70" : "border border-gray-300"
                          }`}
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div >
                  <img
                    src={selectedImage}
                    alt={product.pname}
                    className="w-60 h-60 md:h-80 md:w-80 object-cover rounded-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-4xl mt-5 md:mt-15">

              <h1 className="text-xl md:text-3xl font-semibold mb-1">{product.pname}</h1>
              <h1 className="text-md md:text-lg font-bold text-green-600">Rent : ₹{product.pamount}/{product.ptime}</h1>
              <h1 className="text-sm md:text-md font-medium text-gray-600">(Security Deposit : ₹{product.psecurityDeposit})</h1>

              <div className="mb-4 w-full">
                {/* Main Product Description */}
                <h2 className="text-md font-semibold mb-1 mt-4">Description</h2>
                <p className="text-gray-700 absolute">{mainDescription}</p>
              </div>

              <div className="flex gap-5 mt-60 md:mt-25">
                <FaHeart
                  size={25}
                  onClick={toggleSave}
                  className={`cursor-pointer transition-colors duration-300 ${liked ? "text-red-500" : "text-gray-300 "
                    }`}
                />
                <CiShare2 size={25} className="cursor-pointer" />
                <PiChatCircleDotsLight size={25} className="cursor-pointer" />

              </div>

              <div className="flex gap-4 w-full ">
                <button className="bg-white md:w-full cursor-pointer hover:bg-gray-50 rounded-md transition-all text-purple-500 px-4 py-2 mt-3 sm:w-auto border-2 border-purple-500">
                  Send Enquiry
                </button>
                <button className="bg-purple-600 cursor-pointer hover:bg-purple-700 rounded-md transition-all text-white px-4 py-2 mt-3  sm:w-full md:w-full">
                  RentIt
                </button>

              </div>

            </div>

          </div>

          {/* More Details */}
          <div className="w-full flex flex-col md:flex-row gap-4 p-2 md:p-6">
            <div className="w-full mr-6">
              {moreDetails.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mt-3 md:mt-4 mb-2">More Details</h3>
                  <ul className="list-disc pl-6 text-gray-600  text-left space-y-2">
                    {moreDetails.map((detail, index) => (
                      <li key={index}>{detail}.</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full">
              {defaultDetails.map((field, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 p-1 md:p-3 text-gray-700 ${index % 2 === 0 ? "bg-purple-50" : "bg-white"
                    }`}
                >
                  <div className="font-medium">{field.label}</div>
                  <div>{product[field.key as keyof FormData] || "Not Provided"}</div>
                </div>
              ))}
            </div>

          </div>

          <div className="w-full flex flex-col gap-4 p-2 md:p-6">
            <h2 className="text-xl font-semibold text-gray-700 mt-4">Agreement</h2>
            <div className='flex gap-6 mt-2 md:mt-4 border-2 border-gray-200 rounded-sm w-full p-2 md:p-6'>
              <div className='w-xs md:w-2xl mb-3 '>
                <h2 className="text-lg font-semibold">Rental Agreement</h2>
                <h2 className="text-md text-gray-700">The product must  be returned with all accessories.</h2>
                {terms.map((checkbox) => (
                  <div key={checkbox.id} className="flex items-center space-x-2">
                    <TiTick size={26}
                      className="text-green-500"
                    />
                    <label className="text-gray-700">{checkbox.label}</label>
                  </div>
                ))}
                <h2 className='text-lg text-gray-700 font-semibold mt-3'>Owner's Terms and conditions - </h2>
                <div className="flex items-center space-x-2">
                  <TiTick size={26}
                    className="text-green-500" />
                  <h2 className="text-md text-gray-700">
                    {product.pownClause && product.pownClause.trim() !== ""
                      ? product.pownClause
                      : "No own clause is added"}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <Review productId={productId} />

        </div>

      </DashboardLayout>
    </>

  )
}

export default ProductDetails