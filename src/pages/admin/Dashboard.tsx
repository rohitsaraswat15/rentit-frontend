import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuthContext } from '../../context/useAuthContext';
import Stats from './Stats';
import type { FormDataPost } from '../../types/postTypes';
import { IoPlanetOutline } from "react-icons/io5";


const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<FormDataPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAllUserPosts = () => {
      const allKeys = Object.keys(localStorage)
      const allProducts: FormDataPost[] = [];

      const productKeys = allKeys.filter((key) => key.startsWith("formData_"));


      productKeys.forEach((key) => {
        try {
          const posts = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(posts) && posts.length > 0) {
            allProducts.push(...posts);
          }
        } catch (err) {
          console.warn(`Error reading ${key}:`, err);
        }
      });

      setAllPosts(allProducts);
      setLoading(false);
    };

    fetchAllUserPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;



  return (
    <DashboardLayout>
      <Stats />

      <div className="w-full p-4 space-y-6 pb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Listing Overview
        </h2>

        <div className='grid grid-cols-5 w-full border-2 border-gray-300 text-sm md:text-lg'>
          <div>Product</div>
          <div>Category</div>
          <div>Owner</div>
          <div>Location</div>
          <div>Status</div>
        </div>

        {allPosts.length === 0 ? (
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="relative md:left-1/10 w-full md:w-1/2 lg:w-1/2 h-auto p-6 flex flex-col items-center justify-center">

              <div className="flex items-center justify-center m-auto p-3 w-full">
                <div className={`rounded-full p-6 bg-gray-100 overflow-hidden flex items-center justify-center text-white font-bold`}>
                  <IoPlanetOutline className='text-purple-500' size={100} />
                </div>
              </div>

              <h3 className="text-xl mb-4 mt-4 font-semibold text-center">Nothing to show.</h3>
              <h3 className="text-md text-gray-500 text-center">Currently here is no deleted products. </h3>

            </div>
          </div>) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 w-full ">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 border border-gray-100 hover:shadow-lg sm:hover:bg-gray-100 hover:bg-gray-100 transition grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 "
              >
                <h3 className=" text-sm mdtext-lg font-semibold text-gray-900 ">
                  {post.pname}
                </h3>
                <p className="text-gray-900 text-sm ">{post.pcategory}</p>
                <p className="text-sm text-gray-900 font-medium">
                  {post.postedBy}
                </p>
                <p className="text-gray-900 text-sm ">{post.pcity} </p>
                <p className="text-green-500 font-bold text-sm ">Available</p>


              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
