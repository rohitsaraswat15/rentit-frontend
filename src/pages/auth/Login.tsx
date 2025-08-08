import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import InputField from '../../components/common/InputField';
import GoogleLoginButton from '../../components/common/GoogleLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { loginUser } from '../../services/authService';
import { IoCloseCircle } from "react-icons/io5";

interface FormState {
  email: string;
  password: string;
  role: string;
}

interface ErrorState {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', password: '', role: '' });
  const [errors, setErrors] = useState<ErrorState>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); // for redirect

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};
    if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!isValidPassword(form.password)) newErrors.password = 'Invalid password. Enter correct password';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,

      });

      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.user));
        window.dispatchEvent(new Event('storage'));              // important for navbar to auto update
        console.log('Login success, redirecting to Dashboard');

        if (res.user.role === 'admin') {
          navigate('/homepage')
        } else if (res.user.role === 'user') {
          navigate('/homepage')
        }
      }

      else {
        setErrors({ general: 'Login failed: Invalid credentials' });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ general: 'Login failed: Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    navigate('/')
  };

  return (
    <div className="flex px-4 py-24 sm:px-6 lg:px-8 items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-purple-300 overflow-x-hidden overflow-y-hidden">
      <div className="w-full max-w-md mx-auto p-4 shadow-xl bg-white backdrop-blur-md border border-gray-200 rounded-md">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-00 text-2xl"
          onClick={closeModal}
        >
          <IoCloseCircle />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome to RentIt 👋</h2>
        <h3 className="text-lg font-normal text-gray-800 text-center mb-4 top-1">Please login to your account!</h3>

        <InputField
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <div className="relative">
          <InputField
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
          />
          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-2">{errors.general}</p>
          )}
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </div>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

        <form onSubmit={handleLogin}>
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-xl font-semibold transition ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600 cursor-pointer'
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>


        <div className="flex justify-end mt-3">
          <Link to="/forgetpassword" className="text-sm text-indigo-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="my-5">
          <GoogleLoginButton />
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
