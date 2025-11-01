import { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { BsLightningCharge } from "react-icons/bs";


const Stats = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // Load counts from localStorage
  const loadStats = () => {
    // Count users 
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (Array.isArray(storedUsers)) {
        const nonAdminUsers = storedUsers.filter(
          (user) => user.role?.toLowerCase() !== "admin"
        );
        setTotalUsers(nonAdminUsers.length);
        console.log("Users =", nonAdminUsers.length);
      } else {
        setTotalUsers(0);
      }
    } catch (err) {
      console.warn("Error parsing users:", err);
      setTotalUsers(0);
    }

    // Count products across all users ---
    const allKeys = Object.keys(localStorage);
    const productKeys = allKeys.filter((key) => key.startsWith("formData_"));
    let totalProductsCount = 0;

    productKeys.forEach((key) => {
      try {
        const products = JSON.parse(localStorage.getItem(key) || "[]");
        if (Array.isArray(products)) totalProductsCount += products.length;
      } catch {
        console.warn(`Invalid product data in key: ${key}`);
      }
    });

    setTotalProducts(totalProductsCount);
    console.log("Products =", totalProductsCount);
  };

  useEffect(() => {
    loadStats();

    // Update stats whenever localStorage changes (new post or new user)
    window.addEventListener("storageUpdate", loadStats);
    window.addEventListener("storage", loadStats);

    return () => {
      window.removeEventListener("storageUpdate", loadStats);
      window.removeEventListener("storage", loadStats);
    };
  }, []);

  return (
<section className="w-full py-12 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 mt-10">
   <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-row md:items-center md:justify-center gap-6 md:gap-12">
      {/* Total Users */}
      <div className="relative flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-5 w-full md:w-1/2 border border-white/40 hover:scale-[1.03] transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 pointer-events-none" />
        <FaUsers size={48} className="text-purple-500 mb-4" />
        <h2 className="text-5xl font-bold text-gray-900">{totalUsers}</h2>
        <p className="text-gray-600 text-center w-full sm:text-sm md:text-lg font-medium mt-2">Total Users</p>
      </div>

      {/* Total Products */}
      <div className="relative flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-5 w-full md:w-1/2 border border-white/40 hover:scale-[1.03] transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
        <FaBoxOpen size={48} className="text-indigo-500 mb-4" />
        <h2 className="text-5xl font-bold text-gray-900">{totalProducts}</h2>
        <p className="text-gray-600 text-center w-full sm:text-sm md:text-lg font-medium mt-2">Total Products</p>
      </div>

      {/* Total Raised Issues */}
      <div className="relative flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-5 w-full md:w-1/2 border border-white/40 hover:scale-[1.03] transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 pointer-events-none" />
        <AiOutlineIssuesClose size={48} className="text-purple-500 mb-4" />
        <h2 className="text-5xl font-bold text-gray-900">0</h2>
        <p className="text-gray-600 text-center w-full sm:text-sm md:text-lg font-medium mt-2">Raised Issues</p>
      </div>

      {/* Total Pending Requests */}
      <div className="relative flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-5 w-full md:w-1/2 border border-white/40 hover:scale-[1.03] transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 pointer-events-none" />
        <BsLightningCharge size={48} className="text-purple-500 mb-4" />
        <h2 className="text-5xl font-bold text-gray-900">0</h2>
        <p className="text-gray-600 text-center w-full sm:text-sm md:text-lg font-medium mt-2">Pending Requests</p>
      </div>

      </div>
    </section>
  );
};

export default Stats;
