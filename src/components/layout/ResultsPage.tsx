import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

interface Product {
  pid: number;
  pname: string;
  pdetails: string;
  image: string[];
  date: string;
  postedBy: string;
  pamount: string;
  ptime: string;
  city: string;
  lat: number;
  lng: number;
}

// haversine formula
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase() || "";
  const city = query.get("city")?.toLowerCase() || "";
  const maxDistance = Number(query.get("distance")) || 0;

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [filtered, setFiltered] = useState<Product[]>([]);

  // ✅ Memoize products so it doesn’t recreate on every render
  const allProducts: Product[] = useMemo(() => {
    return JSON.parse(localStorage.getItem("formData") || "[]");
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Error getting location:", err)
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    let result = allProducts.filter((p) => {
  const pname = p.pname?.toLowerCase().trim() || "";
  const pcity = p.city?.toLowerCase().trim() || "";

  const matchesName = searchTerm === "" || pname.includes(searchTerm);
  const matchesCity = city === "" || pcity.includes(city);

  return matchesName && matchesCity;
});
    if (maxDistance > 0) {
      result = result.filter((p) => {
        if (p.lat && p.lng) {
          const dist = getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng);
          return dist <= maxDistance;
        }
        return false;
      });
    }

    setFiltered(result);
  }, [searchTerm, city, maxDistance, userLocation, allProducts]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Results</h2>

      {!userLocation && <p>Fetching your location...</p>}

      {filtered.length === 0 && userLocation && (
        <p className="text-gray-600">No products found matching your search.</p>
      )}

      <ul>
        {filtered.map((p) => {
          const dist = userLocation
            ? getDistance(userLocation.lat, userLocation.lng, p.lat, p.lng).toFixed(2)
            : null;

          return (
            <li key={p.pid} className="p-4 border-b">
              <strong>{p.pname}</strong> – {p.city}
              {dist && <span className="ml-2 text-sm text-gray-500">({dist} km away)</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultsPage;
