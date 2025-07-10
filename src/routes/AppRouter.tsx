import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import SetNewPassword from '../pages/auth/SetNewPassword';
import { Navigate } from 'react-router-dom';
import Dashboard from '../Dashborad';

const AppRoutes: React.FC = () => {
  const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route path="/setnewpassword" element={<SetNewPassword />} />
      <Route path="/dashboard" element={isAuthenticated() ? <Dashboard/> : <Navigate to="/login" />}
/>
    </Routes>
  );
};

export default AppRoutes;