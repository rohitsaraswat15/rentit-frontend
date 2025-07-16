import React, { useState, useEffect } from 'react';
import Footer from '../../components/layout/footer/Footer';
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { LiaFileContractSolid, LiaFileSignatureSolid } from "react-icons/lia";
import { FaPeopleCarry, FaIdCard, FaHandHoldingUsd } from 'react-icons/fa';
import { FaBoxOpen } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '../../components/product/ProductCard';
import type { ReactNode } from 'react';
import { FaMobileAlt } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";
import { TbAirConditioning } from "react-icons/tb";
import { LuSofa } from "react-icons/lu";
import { GiClothes } from "react-icons/gi";
import { PiBooksDuotone } from "react-icons/pi";

interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    defaultLabel?: string;
}


const iconOptions = [
    { name: 'FaMobileAlt', component: <FaMobileAlt /> },
    { name: 'IoMdLaptop', component: <IoMdLaptop /> },
    { name: 'TbAirConditioning', component: <TbAirConditioning /> },
    { name: 'LuSofa', component: <LuSofa /> },
    { name: 'GiClothes', component: <GiClothes /> },
    { name: 'PiBooksDuotone', component: <PiBooksDuotone /> },
];

const iconMap: Record<string, ReactNode> = {
    FaMobileAlt: <FaMobileAlt />,
    IoMdLaptop: <IoMdLaptop />,
    TbAirConditioning: <TbAirConditioning />,
    LuSofa: <LuSofa />,
    GiClothes: <GiClothes />,
    PiBooksDuotone: <PiBooksDuotone />
};

const getInitialItems = () => {
    const stored = localStorage.getItem('admin-cards');
    return stored ? JSON.parse(stored) : [
        { icon: 'FaMobileAlt', title: 'Mobile' },
        { icon: 'IoMdLaptop', title: 'Laptop' },
        { icon: 'TbAirConditioning', title: 'TbAirConditioning' },
    ];
};

const HomePage: React.FC<DropdownProps> = ({ options, onSelect, defaultLabel = 'Select Option' }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [items, setItems] = useState(getInitialItems);
    // Admin form state
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [selectedIconIndex, setSelectedIconIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(defaultLabel);

    const handleSelect = (option: string) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        localStorage.setItem('admin-cards', JSON.stringify(items));
    }, [items]);

    const handleAddNewCard = () => {
        const selectedIconName = iconOptions[selectedIconIndex].name;
        const newCard = {
            icon: selectedIconName,
            title: newTitle.trim(),
        };
        setItems([...items, newCard]);
        setNewTitle('');
        setSelectedIconIndex(0);
        setShowForm(false);
    };

    const handleDeleteCard = (index: number) => {
        const updated = items.filter((item: { icon: string; title: string }, i: number) => i !== index);
        setItems(updated);
    };

    return (
        <>

            <section className="w-full py-12 px-6 md:px-12 lg:px-24 mt-5 bg-gradient-to-l from-teal-400 via-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                    <div className="flex flex-col w-full  py-12 px-6 text-center md:text-left ">
                        <h1 className="text-3xl sm:text-3xl md:text-4xl font-extrabold font-serif text-white mb-4">
                            Why Buy when you can RENT?<br></br> Find Phones,Furniture <br />& more near You!
                        </h1>

                        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 mt-6">
                            <input
                                type="text"
                                placeholder="I am lokking for...."
                                className="w-full text-white sm:w-72 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />

                            <div className="relative w-full max-w-xs">
                                <button
                                    onClick={() => setIsOpen((prev) => !prev)}
                                    className="w-full px-6 py-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {selected}
                                </button>

                                {isOpen && (
                                    <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                        {options.map((option, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => handleSelect(option)}
                                                className="px-4 py-2 cursor-pointer hover:bg-indigo-100 transition"
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-text px-6 py-3 rounded-xl font-medium hover:bg-gray-400 hover:text-white transition">
                                10Km
                            </button>
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="flex w-full">
                        <img
                            src=''
                            alt="Hero Illustration"
                            className="w-full h-auto max-h-[400px] object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* <div className="w-full max-w-9xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10"> */}
                <div className="text-center mb-2 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Select Category
                    </h1>
                </div>
            {/* </div> */}

            <div className="p-6 min-h-fit">
                {/* Admin Toggle and Add Card Button */}
                <div className="mb-2 flex justify-between items-center flex-wrap gap-4">
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className="bg-gray-200 px-4 py-2 rounded shadow"
                    >
                        Toggle Admin Mode: {isAdmin ? 'ON' : 'OFF'}
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
                        >
                            {showForm ? 'Cancel' : 'Add Card'}
                        </button>
                    )}
                </div>

                {/* Admin Add Form */}
                {isAdmin && showForm && (
                    <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full md:w-2/3 lg:w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Add New Card</h3>

                        <input
                            type="text"
                            placeholder="Enter card title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />

                        <div className="flex gap-4 flex-wrap mb-4">
                            {iconOptions.map((icon, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedIconIndex(idx)}
                                    className={`text-3xl p-3 rounded-full border-2 ${selectedIconIndex === idx
                                        ? 'border-indigo-500 bg-indigo-100'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {icon.component}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleAddNewCard}
                            disabled={!newTitle.trim()}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            Add Card
                        </button>
                    </div>
                )}

                {/* Admin View: Grid with Delete Buttons */}
                {isAdmin ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {items.map((item: { icon: string; title: string }, index: number) => (
                            <ProductCard
                                key={index}
                                icon={iconMap[item.icon] ?? <FaBoxOpen />}
                                title={item.title}
                                onDelete={() => handleDeleteCard(index)}
                            />
                        ))}
                    </div>
                ) : (
                    // User View: Carousel
                    <Carousel
                        key={items.length}
                        responsive={{
                            superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
                            desktop: { breakpoint: { max: 1200, min: 768 }, items: 2 },
                            tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
                            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                        }}
                        infinite
                        autoPlay
                        className="py-4"
                    >
                        {items.map((item: { icon: string; title: string }, index: number) => (
                            <ProductCard
                                key={index}
                                icon={iconMap[item.icon] ?? <FaBoxOpen />}
                                title={item.title}
                            />
                        ))}
                    </Carousel>
                )}
            </div>


            <div className="w-full max-w-9xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Trending Rentals near you!
                    </h1>
                </div>
            </div>

            <div className="w-full py-10 px-4 md:px-12 lg:px-24">
                <div className="w-full max-w-9xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                            How RentIt Works?
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                            A quick step-by-step guide to get you started.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center justify-center bg-amber-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <IoSearchSharp className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b>  Search </b><br />
                                Product
                            </p>
                        </div>

                        <div className="flex items-center justify-center bg-blue-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <MdOutlineMarkUnreadChatAlt className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b> Chat </b><br />
                                with Owner
                            </p>
                        </div>

                        <div className="flex items-center justify-center bg-amber-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <LiaFileContractSolid className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b>  Sign </b> <br />
                                Agreement
                            </p>
                        </div>

                        <div className="flex items-center justify-center bg-blue-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <FaPeopleCarry className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b> Pick Up </b> <br />
                                & Start Using
                            </p>
                        </div>

                    </div>
                </div>

                <div className="w-full max-w-9xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-6 md:p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                            Why trust us ?
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-center justify-center bg-amber-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <FaIdCard className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b>  Verified KYC </b><br />
                                Users
                            </p>
                        </div>

                        <div className="flex items-center justify-center bg-blue-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <LiaFileSignatureSolid className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b>  E-Sign Rental </b><br />
                                Agreement
                            </p>
                        </div>

                        <div className="flex items-center justify-center bg-amber-50 rounded-2xl shadow-md p-6 gap-4 transition hover:scale-105 hover:shadow-lg">
                            <FaHandHoldingUsd className="w-12 h-12 text-black" />
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                <b> Security </b><br />
                                Deposit
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-full bg-[#ffffff19] py-16 px-6 sm:px-8 md:px-16 lg:px-32 flex flex-col items-center rounded-xl shadow-lg">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800 text-center mb-6">
                    <span className='text-teal-600'>  Have a device or product you don’t use? </span> Earn money by renting it out.      </h1>

                <button className="bg-gradient-to-r from-purple-600 via-blue-800 to-purple-600 text-white px-6 py-3 rounded-1xl mt-4 text-lg m:text-base font-medium hover:bg-indigo-700 transition duration-300">
                    Post Your Product
                </button>
            </div>

            <Footer />
        </>
    )
};

// export default HomePage

const DropdownExample: React.FC = () => {
  const dropdownOptions = ['Jaipur', 'Delhi', 'Mumbai', 'Agra', 'Indore', 'Banglore'];

  const handleSelect = (selected: string) => {
    console.log('Selected option:', selected);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Choose a Color</h1>

      <HomePage
        options={dropdownOptions}
        onSelect={handleSelect}
        defaultLabel="Select City"
      />
    </div>
  );
};

export default DropdownExample;