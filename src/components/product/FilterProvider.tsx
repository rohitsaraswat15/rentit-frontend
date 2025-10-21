import { useState, type ReactNode } from "react";
import { FilterContext } from "../layout/FilterContext";  

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number}>({
    min:50,
    max:20000,
  })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [distanceKm, setDistanceKm] = useState<number>(0);
  return (
    <FilterContext.Provider value={{ selectedCategory, setSelectedCategory, priceRange, setPriceRange, selectedBrands, setSelectedBrands,selectedCity, setSelectedCity, distanceKm, setDistanceKm }}>
      {children}
    </FilterContext.Provider>
  );
};
