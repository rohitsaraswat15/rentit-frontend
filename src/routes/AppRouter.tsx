import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import SetNewPassword from '../pages/auth/SetNewPassword';
// import { Navigate } from 'react-router-dom';
import UserDashboard from '../pages/user/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../pages/admin/Dashboard';
import HomePage from '../pages/admin/HomePage';
import PostProduct from '../pages/user/PostProduct';
import MyProducts from '../pages/user/MyProducts';




const AppRoutes: React.FC = () => {
  //   const isAuthenticated = () => {
  //   return !!localStorage.getItem('user');
  // };

  // const storedUser = localStorage.getItem('user');
  // // const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route path="/setnewpassword" element={<SetNewPassword />} />
      <Route path='/post-product' element={<PostProduct />} />
      <Route path='/myProducts' element={<MyProducts/>} />
      
      {/* user homepage route */}
      <Route path="/homepage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
};

export default AppRoutes;