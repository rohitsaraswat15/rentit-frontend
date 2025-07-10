import React, { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import InputField from '../../components/InputField';
import '../../App.css';
import OtpInput from '../../components/OTPInput';
import type { OtpInputRef } from '../../components/OTPInput';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { isValidEmail, isValidPhone, isValidPassword, isPasswordMatch } from '../../utils/validators';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import { registerUser, sendOtp, verifyOtp } from '../../services/authService';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  otp?: string;
  general?: string;
}

const Register: React.FC = () => {

  const otpRef = useRef<OtpInputRef>(null);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [otpVerifiedMessage, setOtpVerifiedMessage] = useState<string>('');
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!isValidPassword(form.password))
      newErrors.password = 'Password must be 8+ chars with upper, lower, number & special char.';
    if (!isPasswordMatch(form.password, form.confirmPassword))
      newErrors.confirmPassword = 'Passwords do not match. Enter correct password';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    if (!isOtpVerified) {
      setErrors((prev) => ({ ...prev, otp: 'Please verify OTP before registering.' }));
      return;
    }

    try {
      const response = await registerUser({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      alert((response as { message: string }).message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendOtp = async () => {
    if (!isValidPhone(form.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Phone must be exactly 10 digits.',
      }));
      setShowOtpInput(false);
      return;
    }

    try {
      await sendOtp(form.phone);
      setShowOtpInput(true);
      alert('OTP sent!');
    } catch {
      alert('Failed to send OTP');
    }
  };


  const handleVerifyOtp = async () => {
    if (!form.phone.trim()) {
      setErrors((prev) => ({ ...prev, otp: 'Please enter mobile number.' }));
      return;
    }

    const enteredOtp = otpRef.current?.getOtp();

    if (!enteredOtp || enteredOtp.trim() === '') {
      setErrors((prev) => ({ ...prev, otp: 'Please enter OTP.' }));
      return;
    }

    if (enteredOtp.length < 6) {
      setErrors((prev) => ({ ...prev, otp: 'OTP must be 6 digits.' }));
      return;
    }

    try {
      const res = await verifyOtp(enteredOtp);
      console.log('OTP Verified:', res);
      setOtpVerifiedMessage('OTP Verified Successfully');
      setErrors((prev) => ({ ...prev, otp: '' }));
      setIsOtpVerified(true); // set true on success
    } catch (err: unknown) {
  const errorMessage = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
  setErrors((prev) => ({
    ...prev,
    otp: errorMessage,
  }));
  setOtpVerifiedMessage('');
  setIsOtpVerified(false);
}
  };


  const handleResendOtp = () => {
    setErrors((prev) => ({ ...prev, otp: '' }));
    console.log('OTP resent to', form.phone);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-black">
      <div className="w-full max-w-md mx-auto p-5 shadow-xl bg-white backdrop-blur-md border border-gray-200 rounded">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <InputField type="text" name="fullName" onChange={handleChange} value={form.fullName} placeholder="Full Name" />
        {errors.fullName && <p className="text-sm text-red-500 mb-2">{errors.fullName}</p>}

        <div className="relative">
          <InputField type="tel" name="phone" onChange={handleChange} value={form.phone} placeholder="Phone Number" />
          {errors.phone && <p className="text-sm text-red-500 mb-2">{errors.phone}</p>}
          <div className="absolute top-0 right-3 cursor-pointer hover:text-gray-700">
            <button onClick={handleSendOtp} type="button" className="w-full py-2 px-4 text-blue-800 font-medium rounded-xl transition">
              Send OTP
            </button>
          </div>
        </div>

        <div className="mt-4">
          {showOtpInput && (
            <p className="mb-2 text-sm text-gray-700">Enter OTP sent to {form.phone}</p>
          )}
          <OtpInput
            length={6}
            ref={otpRef}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            contact={form.phone}
            error={errors.otp}
          />
          {errors.otp && (
            <p className="text-sm text-red-500 mt-2 text-center">{errors.otp}</p>
          )}
          {otpVerifiedMessage && (
            <p className="text-green-600 text-sm text-center mt-2">{otpVerifiedMessage}</p>
          )}
        </div>

        <InputField type="email" name="email" onChange={handleChange} value={form.email} placeholder="Email" />
        {errors.email && <p className="text-sm text-red-500 mb-2">{errors.email}</p>}

        <div className="relative">
          <InputField type={showPassword ? 'text' : 'password'} name="password" onChange={handleChange} value={form.password} placeholder="Password" />
          <div onClick={() => setShowPassword((prev) => !prev)} className="absolute top-3.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700">
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </div>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

        <div className="relative">
          <InputField type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" onChange={handleChange} value={form.confirmPassword} placeholder="Confirm Password" />
          <div onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute top-2.5 right-3 cursor-pointer text-gray-500 hover:text-gray-700">
            {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </div>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

        <form onSubmit={handleSubmit}>
          <button className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-sm hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>

        <GoogleLoginButton />

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
