import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProductPageLinks from '../../components/layout/ProductPageLinks';

interface FormData {
  text: string;
  image: string; // This will be the URL or base64 representation of the image
}

const UserBin: React.FC = () => {
  // Use FormData type instead of any
  const [deletedItems, setDeletedItems] = useState<FormData[]>([]);

  useEffect(() => {
    // Retrieve deleted items from localStorage
    const items = localStorage.getItem('deletedItems');
    if (items) {
      setDeletedItems(JSON.parse(items));
    }
  }, []);

  return (
    <DashboardLayout>
        <ProductPageLinks />
      <div className="sm:mt-15 md:mt-15 ">
        <h2 className="text-xl font-semibold mb-4">Deleted Items</h2>
        {deletedItems.length > 0 ? (
          deletedItems.map((item, index) => (
            <div key={index} className="relative mt-4 border-b-2 border-gray-300">
              <div className="flex gap-3">
                {item.image && (
                  <div>
                    <img src={item.image} alt="Uploaded" className="w-25 h-25 object-cover rounded-sm mb-4" />
                  </div>
                )}
                <p className="text-lg">{item.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">No items have been deleted.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserBin;
