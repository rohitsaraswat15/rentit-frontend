import React, { useState } from 'react';
import type { ChangeEvent, FormEvent} from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import InputField from '../../components/InputField';
import { isValidPassword, isPasswordMatch } from '../../utils/validators';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ErrorData {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const SetNewPassword: React.FC = () => {
  const [form, setForm] = useState<FormData>({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<ErrorData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: ErrorData = {};
    if (!isValidPassword(form.password))
      newErrors.password = 'Password must be 8+ chars with upper, lower, number & special char.';
    if (!isPasswordMatch(form.password, form.confirmPassword || ''))
      newErrors.confirmPassword = 'Passwords do not match. Enter correct password';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSave = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("Form submitted:", form);
      alert("Login Success (simulate backend)");
    } catch {
      setErrors({ general: 'Something went wrong. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-black">
        <div className="w-full max-w-md mx-auto p-5 shadow-xl bg-white backdrop-blur-md border border-gray-200 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Set New Password</h2>

          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Password"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </div>
          </div>

          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

          <div className="relative">
            <InputField
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword || ''}
              placeholder="Confirm Password"
            />
            <div
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </div>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

          <button
            onClick={handleSave}
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-2 rounded-xl font-semibold transition ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-green-700'}`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>

          <form>
            <Link to="/login">
              <button className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-sm hover:bg-green-700 transition">
                Login Again
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
