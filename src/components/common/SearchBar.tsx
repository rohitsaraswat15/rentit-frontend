import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    defaultLabel?: string;
}

const SearchBar: React.FC<DropdownProps> = ({ options, onSelect, defaultLabel = 'Select Option' }) => {
    const [query, setQuery] = useState("");
     const [distance, setDistance] = useState("");
    const [isOpen, setIsOpen] = useState(false);
     const [selected, setSelected] = useState<string>(defaultLabel);
    
    
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/results?query=${query}&city=${selected}&distance=${distance}`);
    };

     const handleSelect = (option: string) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <input
                type="text"
                placeholder="I am looking for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-72 px-4 py-3 border rounded-xl"
            />


            <div className="relative w-full max-w-xs">
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full px-6 py-3 text-left bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {selected}
                </button>

                {isOpen && (
                    <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-sm">
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

            {/* <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full sm:w-48 px-4 py-3 border rounded-xl"
      /> */}

            <input
                type="number"
                placeholder="Distance (km)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full sm:w-40 px-4 py-3 border rounded-xl"
            />

            <button
                onClick={handleSearch}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
            >
                Search
            </button>
        </div>
    );
};

// export default SearchBar;
const Dropdown: React.FC = () => {
    const dropdownOptions = ['Jaipur', 'Delhi', 'Mumbai', 'Agra', 'Indore', 'Banglore'];

    const handleSelect = (selected: string) => {
        console.log('Selected option:', selected);
    };

    return (
        <div>
            <SearchBar
                options={dropdownOptions}
                onSelect={handleSelect}
                defaultLabel="Select City"
            />
        </div>
    );
};

export default Dropdown;
