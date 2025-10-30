import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // AuthProvider stores token
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
