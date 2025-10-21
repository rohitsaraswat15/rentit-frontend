import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoPlanetOutline } from "react-icons/io5";
import CategoryPageLayout from "../layout/CategoryPageLayout";
import { useFilter } from "../../hooks/useFilter";
import { FilterProvider } from "./FilterProvider";

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  Jaipur: { lat: 26.9124, lon: 75.7873 },
  Delhi: { lat: 28.6139, lon: 77.209 },
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Chandigarh: { lat: 30.7333, lon: 76.7794 },
};

// ✅ Utility function
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface Product {
  pid: number;
  pname: string;
  pdetails: string;
  image: string[];
  date: string;
  postedBy: string;
  pamount: string;
  ptime: string;
  city: string;
  pcategory: string;
  pbrandmodel: string;
  pdlocation: string;
  pcity: string;
}

const CategoryPageContent = () => {
  const { name } = useParams<{ name: string }>();
  const { selectedCategory, priceRange, selectedBrands, selectedCity, distanceKm } = useFilter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  console.log(availableBrands)

  //To get user's current location
  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Please allow location access for nearby product search.");
        }
        console.error("Location permission denied or unavailable", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}, []);

  // Load all products
  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("formData") || "[]");
    setAllProducts(storedProducts);
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;
    const currentCategory = selectedCategory != "All" ? selectedCategory : name;
    const categoryProducts = allProducts.filter(
      (p) => p.pcategory?.toLowerCase() === currentCategory?.toLowerCase()
    )

    const uniqueBrands = [
      ...new Set(categoryProducts.map((p) => p.pbrandmodel?.trim()).filter(Boolean)),
    ];

    setAvailableBrands(uniqueBrands);

  }, [selectedCategory, name, allProducts])

  // Filter products when category or URL changes or according to price
  useEffect(() => {
    if (allProducts.length === 0) return;

    let productsToShow: Product[] = [];

    // If user manually selects category via radio than it will override URL category
    if (selectedCategory && selectedCategory !== "All") {
      productsToShow = allProducts.filter(
        (p) => p.pcategory?.toLowerCase() === selectedCategory.toLowerCase()
      );
    } else if (name && name.toLowerCase() !== "all") {
      // If no radio selected, use URL category
      productsToShow = allProducts.filter(
        (p) => p.pcategory?.toLowerCase() === name.toLowerCase()
      );
    } else {
      productsToShow = [...allProducts];
    }

    //filter by price
    if (priceRange) {
      productsToShow = productsToShow.filter((p) => {
        const price = parseInt(p.pamount.replace(/[^0-9]/g, ""), 10);
        return price >= priceRange.min && price <= priceRange.max
      })
    }

    //filter by brand
    if (selectedBrands.length > 0) {
      productsToShow = productsToShow.filter((p) =>
        selectedBrands.includes(p.pbrandmodel)
      )
    }

    // filter by location + distance
  if ((selectedCity || userLocation) && distanceKm > 0) {
    const userCoords =  userLocation || cityCoordinates[selectedCity as keyof typeof cityCoordinates];
    if (userCoords) {
      productsToShow = productsToShow.filter((p) => {
        const deliveryCity = p.city || p.pdlocation;
        const productCoords = cityCoordinates[deliveryCity];
        if (!productCoords) return false;

        const distance = calculateDistance(
          userCoords.lat,
          userCoords.lon,
          productCoords.lat,
          productCoords.lon
        );

        return distance <= distanceKm;
      });
    }
  }

    setFilteredProducts(productsToShow);

  }, [selectedCategory, name, allProducts, priceRange, selectedBrands, selectedCity, distanceKm, userLocation]);


  return (
    <CategoryPageLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 md:mt-20">
          Category: {selectedCategory !== "All" ? selectedCategory : name}
        </h2>
        <section className="p-4 lg:p-8">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <IoPlanetOutline className="text-purple-500 mb-4" size={80} />
              <h3 className="text-xl font-semibold">Nothing to show.</h3>
              <p className="text-gray-500">
                Currently we don't have any active product of this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => {
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
                        <button className="w-1/2 px-3 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition">
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
          )}
        </section>
      </div>
    </CategoryPageLayout>
  );
};

const CategoryPage = () => {
  return (
    <FilterProvider>
      <CategoryPageContent />
    </FilterProvider>
  );
};

export default CategoryPage;
