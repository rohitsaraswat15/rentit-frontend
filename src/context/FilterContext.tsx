//creating context
import { createContext } from "react";

export interface FilterContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: { min: number; max: number};
  setPriceRange: (range: { min: number; max: number}) => void;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  distanceKm: number;
  setDistanceKm: (km: number) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);
