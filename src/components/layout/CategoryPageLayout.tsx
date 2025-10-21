import { useState } from "react";
import Filters from "./Filters";
import { FaFilter } from "react-icons/fa";
 
const CategoryPageLayout = ({ children }: { children: React.ReactNode }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
     
    <div className="flex flex-col md:flex-row min-h-screen">
      {/*Sidebarfilter for tablet & desktop*/}
      <aside className="hidden md:block w-64 border-r bg-white shadow-md p-4">
        <Filters
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 relative">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex mt-20 items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            <FaFilter /> Filters
          </button>
        </div>

        {children}
      </main>

      {/* Mobile Filter Drawer (Bottom Sheet) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 backdrop-brightness-40 flex justify-center items-end">
          <div className="bg-white w-full rounded-t-2xl shadow-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold mt-10">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <Filters
            />
          </div>
        </div>
      )}
    </div>
   );
};

export default CategoryPageLayout;
