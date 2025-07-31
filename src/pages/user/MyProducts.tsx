import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface FormData {
  text: string;
  image: string; // This will be the URL or base64 representation of the image
}

const MyProducts: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    // Retrieve form data from localStorage
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
    <DashboardLayout> 
      <h2 className="text-xl font-semibold">Submitted Details</h2>
      {formData ? (
        <div className="mt-4">
          <p className="text-lg">Text: {formData.text}</p>
          {formData.image && (
            <div className="mt-4">
              <img src={formData.image} alt="Uploaded" className="w-48 h-48 object-cover rounded-md" />
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No data submitted yet.</p>
      )}
      </DashboardLayout>
    </>
  );
};

export default MyProducts;
