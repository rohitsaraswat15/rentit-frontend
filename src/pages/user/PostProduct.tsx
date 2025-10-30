import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductPageLinks from '../../components/layout/ProductPageLinks';
import { FaRegSmileBeam } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import InputField from '../../components/common/InputField';
import { TiTick } from "react-icons/ti";
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineSmallDash } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { GoVerified } from "react-icons/go";
import { terms } from './constant/Terms';
import { useAuthContext } from '../../context/useAuthContext';
import type { FormData } from '../../types/postTypes';
import { createPost } from '../../services/productService';

const initialFormData: FormData = {
    id:"",
    userid:"",
    pname: "",
    pdetails: "",
    pcategory: "",
    pbrandmodel: "",
    pamount: "",
    ptime: "",
    psecurityDeposit: "",
    pdlocation: "",
    pddate: "",
    pdtime: "",
    pdelivery: "",
    pstate: "",
    pcity: "",
    image: [],
    pagreement: false,
    pownClausecheckbox: "",
    pownClause: "",
    date: "",
    postedBy: "",
    pfinalAgreement: false,
};

const reviewDetailsFields = [
    { key: "pname", label: "Name", type: "text" },
    { key: "pdetails", label: "Details", type: "text" },
    { key: "pcategory", label: "Category", type: "text" },
    { key: "pbrandmodel", label: "Brand/ Model", type: "text" },
    { key: "pamount", label: "Rent Amount", type: "number" },
    { key: "ptime", label: "Time", type: "text" },
    { key: "psecurityDeposit", label: "Security Deposit", type: "number" },
    { key: "pdlocation", label: "Delivery Location", type: "text" },
    { key: "pddate", label: "Delivery Date", type: "date" },
    { key: "pdtime", label: "Time Duration", type: "time" },
    { key: "pdelivery", label: "Delivery", type: "text" },
    { key: "image", label: "Image", type: "image" },
]

const PostProduct: React.FC = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [rentalAgreement, setRentalAgreement] = useState(false)
    const [clauseClick, setClauseClick] = useState(false)
    const [saveClick, setSaveClick] = useState(false)
    const [step, setStep] = useState(1)
    const { user } = useAuthContext();
    const [postFormData, setPostFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState<string>("");

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostFormData((prev) => ({
            ...prev,
            pdelivery: e.target.value,
        }));
    };

    const closeModal = () => {
        setShowSuccessMessage(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first before posting!");
            return;
        }
        if (!postFormData.pfinalAgreement && step === 4) {
            setError("You must accept the terms and conditions before continuing.");
            return;
        }

        //get the current date 
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })

        // Create a new object with form data
        const formData: FormData = {
            ...postFormData,
            date: formattedDate,
            postedBy: user.name,
            userid: user.id,
            id: Date.now().toString(), 
        };

        setShowSuccessMessage(true)
        const userFormDataKey = `formData_${user.id}`;
        // Retrieve existing data from localStorage, or initialize an empty array
        let storedData: FormData[] = JSON.parse(localStorage.getItem(userFormDataKey) || '[]');

        if (!Array.isArray(storedData)) {
            storedData = []; // If not an array, reset to an empty array
        }

        // Add new form data to the array
        storedData.push(formData);

        // Send to backend too (no effect if API fails)
        try {
            await createPost(formData);
            console.log('Post sent to backend successfully.');
        } catch (error) {
            console.warn(error,'Could not send to backend, continuing with local storage.');
        }

        // Save the updated array back to localStorage
        localStorage.setItem(userFormDataKey, JSON.stringify(storedData));

        // Reset the form after submission
        setPostFormData(initialFormData)
        setError("");
        window.dispatchEvent(new Event("storageUpdate"));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const selectedFiles = Array.from(files);

        // Check max 4 images limit
        if (postFormData.image.length + selectedFiles.length > 4) {
            setError("You can upload a maximum of 4 images.");
            return;
        }

        // Convert each file into base64 string
        const readers = selectedFiles.map((file) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file); // convert file → base64
            });
        });

        Promise.all(readers).then((base64Files) => {
            setPostFormData((prev) => ({
                ...prev,
                image: [...prev.image, ...base64Files],
            }));
            setError("");
        });
    };


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPostFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRentalClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPostFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
        if (checked) {
            setError("");
        }
        setRentalAgreement(true)
    }

    const handleClauseClick = () => {
        setClauseClick(true)
    }

    const handleSaveClick = () => {
        setSaveClick(true)
    }

    const StepIndicator = ({ stepIndex }: { stepIndex: number }) => {
        const isActive = stepIndex === step; // Check if the step is the active one
        const isCompleted = stepIndex < step; // Check if the step is already completed
        return (
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${isActive
                    ? 'bg-purple-500 text-white border-purple-800' // Active step
                    : isCompleted
                        ? 'bg-green-500 text-white border-green-500' // Completed step
                        : 'bg-gray-200 border-gray-300' // Inactive step
                    }`}
            >
                {isCompleted ? <FaCheckCircle size={20} /> : stepIndex}
            </div>
        );
    };

    const getStepName = (stepIndex: number): string => {
        switch (stepIndex) {
            case 1:
                return 'Details';
            case 2:
                return 'Agreement';
            case 3:
                return 'Payment';
            case 4:
                return 'Review/Submit';
            default:
                return '';
        }
    };

    const handleNext = () => {
        if (!postFormData.pagreement && step === 2) {
            setError("You must accept the terms and conditions before continuing.");
            return;
        }
        else if (step < 4) {
            setStep(step + 1);
        }
        setError("");

    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    //   const handleSave = () => {
    //     // Save form data logic here
    //     console.log('Saving form data:', formData);
    //   };

    return (
        <>
            <DashboardLayout>
                <ProductPageLinks />

                <div className="flex flex-col justify-center items-center mt-2 md:mt-15 w-full">
                    <div className="w-full sm:w-3/4 md:w-full lg:w-full p-8 mb-8">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                            Product Listing Form                        </h2>
                        <p className="text-gray-600 text-center mb-6 md:px-10">
                            Please complete the form below step by step. Make sure to click "Save" before proceeding to the next step. This form follows a simple step-by-step process to guide you through submitting your details. Each step focuses on collecting specific information, ensuring everything is accurate before you proceed. You can always review or edit your responses before final submission.
                        </p>
                        <div className='border-t-2 border-gray-200 w-full mb-4'></div>

                        {/* Step bar */}
                        <div className='flex justify-center items-center m-auto gap-2 md:gap-4 md:p-4 md:w-3xl'>
                            {
                                [1, 2, 3, 4].map((s) => (
                                    <>
                                        <div key={s} className='flex flex-col items-center w-3xl'>
                                            <StepIndicator stepIndex={s} />
                                            <span className=" text-xs md:text-sm text-gray-900 font-semibold mt-2">{getStepName(s)}</span>
                                        </div>
                                        {s < 4 && <AiOutlineSmallDash size={60} className="text-gray-500 mx-2 flex m-auto w-sm md:w-2xs" />}
                                    </>
                                ))
                            }
                        </div>
                        <div className='border-t-2 border-gray-200 w-full mb-4'></div>

                        {/* Product Listing Form Content */}
                        <div className=" relative mb-8 flex flex-col justify-start items-start m-auto md:w-2xl md:mt-6 mt-4  ">
                            {step === 1 && (
                                <>
                                    <h2 className="text-xl font-medium text-gray-700">Product Listing Form</h2>

                                    <div className='mb-4 mt-4 w-xs md:w-2xl'>
                                        <label className='block text-sm mb-3 font-medium text-gray-700'>Product Name</label>
                                        <InputField type="text" value={postFormData.pname} onChange={handleOnChange} placeholder="Enter Product Name" name='pname'
                                        />
                                    </div>

                                    <div className="flex gap-4 mb-4 w-xs md:w-2xl">
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Product Details</label>
                                            <InputField type="text" value={postFormData.pdetails} onChange={handleOnChange} placeholder="Enter Product Details" name='pdetails'
                                            />
                                        </div>

                                        {/* dropdown */}
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <select value={postFormData.pcategory} onChange={handleOnChange} name='pcategory'
                                                className={`w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-primary transition duration-300 placeholder:text-sm placeholder:text-gray-400`}

                                            >
                                                <option value="">Select Category</option>
                                                <option value="Furniture">Furniture</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="Laptop">Laptop</option>
                                                <option value="AC">AC</option>
                                                <option value="Cloths">Cloths</option>
                                                <option value="Books">Books</option>
                                                <option value="Headphone">Headphone</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3 w-xs md:w-2xl'>
                                        <label className="block text-sm font-medium text-gray-700">Brand/Model</label>
                                        <InputField type="text" value={postFormData.pbrandmodel} onChange={handleOnChange} placeholder="Enter Brand or Model" name='pbrandmodel'
                                        />
                                    </div>

                                    <h2 className="text-xl font-medium text-gray-700">Availability</h2>
                                    <div className="flex gap-4 mb-4 w-xs md:w-2xl">
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Rent Amount</label>
                                            <InputField type="number" value={postFormData.pamount} onChange={handleOnChange} placeholder="Enter amount" name='pamount'
                                            />
                                        </div>

                                        {/* dropdown */}
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Time</label>
                                            <select value={postFormData.ptime} onChange={handleOnChange} name='ptime'
                                                className={`w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-primary transition duration-300 placeholder:text-sm placeholder:text-gray-400`}

                                            >
                                                <option value="">Select Time</option>
                                                <option value="Per hour">Per hour</option>
                                                <option value="Per Day">Per Day</option>
                                                <option value="Per Month">Per Month</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='w-xs md:w-2xl flex flex-col gap-3'>
                                        <label className="block text-sm font-medium text-gray-700">Security Deposit</label>
                                        <InputField type="number" value={postFormData.psecurityDeposit} onChange={handleOnChange} placeholder="Enter Security deposit" name='psecurityDeposit'
                                        />
                                    </div>

                                    <h2 className="text-xl font-medium text-gray-700">Location</h2>
                                    <div className="flex flex-col md:flex-row gap-4 mb-4 w-xs md:w-2xl">
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Delivery Location</label>
                                            <InputField type="text" value={postFormData.pdlocation} onChange={handleOnChange} placeholder="Enter Location" name='pdlocation'
                                            />
                                        </div>

                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Date</label>
                                            <InputField type="date" value={postFormData.pddate} onChange={handleOnChange} placeholder="Enter Date" name='pddate'
                                            />
                                        </div>

                                        {/* dropdown */}
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">Time Duration</label>
                                            <InputField type="time" value={postFormData.pdtime} onChange={handleOnChange} placeholder="Time" name='pdtime'
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mb-4 w-xs md:w-2xl">
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">State</label>
                                            <InputField type="text" value={postFormData.pstate} onChange={handleOnChange} placeholder="Enter State" name='pstate'
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-3'>
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <InputField type="text" value={postFormData.pcity} onChange={handleOnChange} placeholder="Enter City" name='pcity'
                                            />
                                        </div>
                                    </div>

                                    {/* Radio buttons */}
                                    <h2 className="w-xs md:w-2xl text-xl font-medium text-gray-700">Delivery</h2>
                                    <div className='flex gap-10'>
                                        <label>
                                            <input className='mr-3' type="radio" name="myRadioGroup" value="I will deliver" checked={postFormData.pdelivery === 'I will deliver'} onChange={handleRadioChange}
                                            />
                                            I will deliver
                                        </label>
                                        <label>
                                            <input className='mr-3' type="radio" name="myRadioGroup" value="Buyer must pick up" checked={postFormData.pdelivery === 'Buyer must pick up'} onChange={handleRadioChange}
                                            />
                                            Buyer must pick up
                                        </label>
                                    </div>


                                    <div className='mb-4 w-xs md:w-2xl mt-4'>
                                        <label className='block text-xl font-medium text-gray-700'>Upload Image</label>
                                        <input type="file"
                                            onChange={handleImageChange}
                                            className='mt-1 block w-full bg-gray-100 p-6 border-1 border-gray-400 cursor-pointer'
                                            accept="image/*"
                                        />
                                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                                        {/* Preview Images */}
                                        <div className="flex gap-3 mt-3 flex-wrap">
                                            {postFormData.image.map((img, index) => (
                                                <img
                                                    key={`${img}-${index}`}
                                                    src={img}
                                                    alt={`upload-${index}`}
                                                    className="w-15 h-15 object-cover rounded-sm"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    {/* Agreement */}
                                    <h2 className="text-xl font-medium text-gray-700 ">Agreement</h2>
                                    <p className="text-gray-600 mb-6 left-0 mt-3">
                                        As the owner of this project, I am committed to delivering a reliable and user-focused product. By accepting this agreement, you acknowledge our shared responsibility to maintain trust, fairness, and ethical use of the product. Any misuse or breach of terms may result in restricted access or further action.
                                    </p>

                                    <label className='w-xs md:w-2xl flex items-center mt-4 mb-3 font-bold text-gray-900'> <input className="mr-2 scale-150" type="checkbox" checked={postFormData.pagreement} onChange={handleRentalClick} name='pagreement' />I agree with all the Terms and Conditions in this Rental Agreement</label>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    {rentalAgreement && (
                                        <>
                                            <h2 className="text-xl font-semibold mt-4">Terms</h2>
                                            <div className="space-y-4 w-xs md:w-2xl mt-4">
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


                                                <label className='w-xs md:w-2xl flex items-center mt-4 mb-3'> <input className='mr-2 h-5 w-5' type="checkbox" value={postFormData.pownClausecheckbox} onClick={handleClauseClick} onChange={handleOnChange} placeholder="" name='pownClausecheckbox' />Add your own clause <span className='text-gray-600 font-semibold'>( if any or click on save button to proceed )</span> </label>
                                                {clauseClick && (
                                                    <>
                                                        <div className='flex gap-2'>
                                                            <InputField type="text" value={postFormData.pownClause} onChange={handleOnChange} placeholder="Add your own clause" name='pownClause' />
                                                            <button
                                                                onClick={handleSaveClick}
                                                                type='submit'
                                                                className="flex item-end justify-end right-0 mb-3 bg-purple-500 text-white py-2  px-6 rounded-sm hover:bg-purple-600 focus:outline-none cursor-pointer"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </>
                                                )}


                                                {saveClick && (
                                                    <>
                                                        <h2 className="text-xl mt-4 font-medium text-gray-700">Live Agreement Preview</h2>
                                                        <div className='mt-4 w-xs md:w-2xl mb-3 '>
                                                            <h2 className="text-lg mt-4 font-semibold">Rental Agreement</h2>
                                                            <h2 className="text-md text-gray-700">The product must  be returned with all accessories.</h2>
                                                            {terms.map((checkbox) => (
                                                                <div key={checkbox.id} className="flex items-center space-x-2">
                                                                    <TiTick size={26}
                                                                        className="text-green-500"
                                                                    />
                                                                    <label className="text-gray-700">{checkbox.label}</label>
                                                                </div>
                                                            ))}
                                                            <h2 className='text-lg text-gray-700 font-semibold mt-3'>Your Terms and conditions - </h2>
                                                            <div className="flex items-center space-x-2">
                                                                <TiTick size={26}
                                                                    className="text-green-500" />
                                                                <h2 className="text-md text-gray-700">
                                                                    {postFormData.pownClause && postFormData.pownClause.trim() !== ""
                                                                        ? postFormData.pownClause
                                                                        : "No own clause is added"}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h2 className="text-xl font-semibold">Total Payment Agreement</h2>
                                    <p className="text-gray-600 mb-6 mt-3">
                                        Before final submission of your product listing,
                                        you are required to complete the payment as per
                                        the applicable charges set by RentIt. Only after
                                        successful payment will your product be posted on the platform,
                                        confirming this agreement between you and RentIt </p>

                                    <div className='mt-4 flex items-center justify-between gap-4 w-full mb-4'>
                                        <h2 className="text-lg font-semibold w-full">Total Payment agreement </h2>
                                        <h2 className="text-xl font-bold w-full">₹ 69 </h2>
                                        <button
                                            className="flex right-0 bg-purple-500 text-white px-4 py-1 md:px-10 md:py-2 border-2 border-purple-500 rounded-sm hover:bg-purple-600 cursor-pointer"
                                        >
                                            Pay
                                        </button>

                                    </div>
                                </>

                            )}

                            {step === 4 && (
                                <>
                                    <h1 className='text-lg text-gray-900 font-semibold'>Review your details before final posting</h1>
                                    <h2 className="text-xl font-semibold text-gray-700 mt-4">Product Details</h2>

                                    <div className='flex gap-3 mt-4 border-2 border-gray-200 rounded-sm w-full p-5'>
                                        <div className="space-y-2 w-full">
                                            {reviewDetailsFields.map((field) => (
                                                <div
                                                    key={field.key}
                                                    className="flex items-start pb-2 w-full text-gray-700"
                                                >
                                                    {/* Label */}
                                                    <span className="capitalize font-bold p-2 w-40 shrink-0">
                                                        {field.label}
                                                    </span>

                                                    {/* Value */}
                                                    <span className="flex-1 p-2 border-l-2 border-gray-200 break-words break-all">
                                                        {field.type === "image" ? (
                                                            postFormData[field.key as keyof FormData] ? (
                                                                <div className="flex gap-3 mt-3 flex-wrap">
                                                                    {postFormData.image.map((img, index) => (
                                                                        <img
                                                                            key={index}
                                                                            src={img}
                                                                            alt={`upload-${index}`}
                                                                            className="w-15 h-15 object-cover rounded-sm"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                "No Image Provided"
                                                            )
                                                        ) : (
                                                            postFormData[field.key as keyof FormData] || "Not Provided"
                                                        )}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                    <h2 className="text-xl font-semibold text-gray-700 mt-4">Agreement</h2>
                                    <>
                                        <h2 className="text-lg mt-4 font-medium text-gray-700">Live Agreement Preview</h2>
                                        <div className='flex gap-6 mt-4 border-2 border-gray-200 rounded-sm w-full p-6'>
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
                                                <h2 className='text-lg text-gray-700 font-semibold mt-3'>Your Terms and conditions - </h2>
                                                <div className="flex items-center space-x-2">
                                                    <TiTick size={26}
                                                        className="text-green-500" />
                                                    <h2 className="text-md text-gray-700">
                                                        {postFormData.pownClause && postFormData.pownClause.trim() !== ""
                                                            ? postFormData.pownClause
                                                            : "No own clause is added"}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                    <h2 className="text-xl font-semibold text-gray-700 mt-4">Payment</h2>
                                    <div className='flex gap-6 mt-4 border-2 border-gray-200 rounded-sm w-full p-6'>
                                        <div className='mt-4 flex items-center justify-between gap-4 w-full mb-4'>
                                            <h2 className="text-lg font-semibold w-full">Total Payment agreement </h2>
                                            <h2 className="text-xl font-bold w-full">₹ 69 </h2>
                                            <div className='flex gap-2 items-center justify-center m-auto text-green-600 text-xl font-bold' >
                                                <GoVerified />
                                                <span> Payed</span>
                                            </div>

                                        </div>
                                    </div>
                                    <label className='w-xs md:w-2xl flex items-center mt-4 mb-3 font-bold text-gray-900'> <input className="mr-2 scale-150" type="checkbox" checked={postFormData.pfinalAgreement} onChange={handleRentalClick} name='pfinalAgreement' />
                                        I hereby declare that i have read and understood the Product Rental Agreement, and I agree to comply with its terms and conditions.
                                    </label>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}


                                </>

                            )}

                            {showSuccessMessage && (
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
                                        <h3 className="text-xl mb-4 mt-6 font-semibold text-center">You have added new product successfully.</h3>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-6">

                                {/* Buttons */}
                                <div className='absolute flex items-start justify-start left-0 mt-4 mb-8'>
                                    {step > 1 && (
                                        <button
                                            onClick={handleBack}
                                            className="bg-white text-purple-500 md:px-6 md:py-2 rounded-full border-2 border-purple-500 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <IoChevronBackOutline size={26} />
                                        </button>
                                    )}
                                </div>


                                <div className='absolute flex gap-4 md:gap-6 items-end justify-end right-0 mt-4 mb-8'>
                                    {step !== 4 && (
                                        <button
                                            className="bg-purple-500 text-white px-4 py-1 md:px-6 md:py-2 border-2 border-purple-500 rounded-sm hover:bg-purple-600 cursor-pointer"
                                        >
                                            Save
                                        </button>
                                    )}

                                    {step < 4 && (
                                        <button
                                            onClick={handleNext}
                                            className="bg-gray-50 text-purple-500 px-4 py-1 md:px-6 md:py-2 rounded-sm border-2 border-purple-500 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Next
                                        </button>
                                    )}


                                    {step === 4 && (
                                        <form onSubmit={handleSubmit} className='mt-4'>
                                            <button
                                                type='submit'
                                                className=" bg-purple-500 text-white py-2 px-4 rounded-sm hover:bg-purple-600 focus:outline-none cursor-pointer"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                            <div className='border-t-2 border-gray-200 w-full mb-4'></div>
                        </div>
                        <div className='border-t-2 border-gray-200 w-full mb-4 mt-15'></div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default PostProduct