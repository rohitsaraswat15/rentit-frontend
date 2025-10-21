import { useState, useEffect } from "react";
import { useFilter } from "../../hooks/useFilter";
import { useParams } from "react-router-dom";
import type { Product } from "../../components/product/CategoryPage";


const Filters = () => {
  const { name } = useParams<{ name: string }>();
  const { selectedCategory, setSelectedCategory, setPriceRange, selectedBrands, setSelectedBrands, selectedCity, setSelectedCity, distanceKm, setDistanceKm } = useFilter();
  const [price, setPrice] = useState(50000);
  const [over50k, setOver50k] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);

  const categories = ["All", "Mobile", "Furniture", "Fashion", "Books", "Cloths", "Laptop", "AC"];
  const cities = ["Jaipur", "Delhi", "Mumbai", "Pune", "Bangalore", "Chandigarh"];

  // useEffect(() => {
  //   const allProducts = JSON.parse(localStorage.getItem("formData") || "[]");
  //   if (selectedCategory && selectedCategory !== "All") {
  //     const filteredBrands: string[]= [
  //       ...new Set<string>(
  //         allProducts
  //           .filter((p: Product) => p.pcategory?.toLowerCase() === selectedCategory.toLowerCase())
  //           .map((p: Product) => p.pbrandmodel?.trim() || "")
  //           .filter(Boolean)
  //       ),
  //     ];
  //     setBrands(filteredBrands);
  //   } else {
  //     setBrands([]);
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("formData") || "[]");

    const categoryToUse = selectedCategory && selectedCategory !== "All" ? selectedCategory : name;

    if (categoryToUse) {
      const filteredBrands = storedProducts
        .filter((p) => p.pcategory?.toLowerCase() === categoryToUse.toLowerCase())
        .map((p) => p.pbrandmodel)
        .filter(Boolean); // remove empty/null brands

      // Get unique brand names only
      setBrands(Array.from(new Set(filteredBrands)));
    } else {
      setBrands([]);
    }
  }, [selectedCategory, name]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };



  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value));
    setOver50k(false);
  }

  const handleOver50kChange = () => {
    setOver50k(true);
  }

  const handleApplyFilter = () => {
    if (over50k) {
      setPriceRange({ min: 50000, max: Infinity })
    }
    else {
      setPriceRange({ min: 50, max: price })
    }
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">

      {/* filter by city and distance */}
      <aside className="p-4 mt-10 bg-white space-y-4">
                <h3 className="text-lg font-semibold mb-3">Location</h3>
        <div>
           <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Distance (in km)</label>
          <input
            type="number"
            value={distanceKm}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
            placeholder="Enter km range"
            className="border p-2 rounded w-full"
          />
        </div>
      </aside>

      {/* filter by category */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold mb-3 mt-5">Filter by Category</h3>

        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={handleCategoryChange} // updates context
              className="accent-purple-500"
            />
            {category}
          </label>
        ))}
      </div>

      {/* filter by price */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold mb-3 mt-10">Price Range</h3>
        <div className="flex flex-col gap-2">
          <input type="range"
            min={50}
            max={50000}
            step={100}
            value={price}
            onChange={handlePriceChange}
            className="w-full accent-purple-500"
            disabled={over50k}
          />

          <div className="flex justify-between text-sm text-gray-600">
            <span>₹50</span>
            <span>{over50k ? "Over ₹50,000" : `${price}`}</span>
            <span>₹50,000</span>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer mt-2">
            <input type="checkbox"
              checked={over50k}
              onChange={handleOver50kChange}
              className="accent-purple-500"
            />
            <span>Over ₹50,000</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleApplyFilter}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Go
      </button>

      {/* filter by brands */}
      {brands.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Filter by Brand</h3>
          <div className="flex flex-col gap-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="accent-purple-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Filters;
