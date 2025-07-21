import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../../components/common/OTPInput';
import InputField from '../../components/common/InputField';
import { sendOtp, verifyOtp } from '../../services/authService';
import type { OtpInputRef } from '../../components/common/OTPInput';

const ForgotPassword: React.FC = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpError, setOtpError] = useState<string>('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | ''>('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const otpRef = useRef<OtpInputRef>(null);
  const navigate = useNavigate();
  const [otpSuccess, setOtpSuccess] = useState<string>('');
  

  const handleSendOtp = async () => {
    const contact = contactMethod === 'email' ? email : phone;
    if (!contact.trim()) {
      setOtpError(`Please enter your ${contactMethod}.`);
      return;
    }
    try {
      await sendOtp(contact);
      setShowOtpInput(true);
      setOtpError('');
      alert(`OTP sent to ${contact}`);
    } catch {
      setOtpError('Failed to send OTP. Try again.');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otpRef.current?.getOtp();
    if (!enteredOtp || enteredOtp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      await verifyOtp(enteredOtp);
      setOtpVerified(true);
      setOtpError('');
      setOtpSuccess('OTP Verified Successfully');
      console.log("OTP Verified Successfully")
    } catch (err) {
      if (err instanceof Error) {
        setOtpError(err.message);
      } else {
        setOtpError('Invalid OTP');
        setOtpSuccess("")
        console.log('Invalid OTP. Please try again.')
      }
      setOtpVerified(false);
    }
  };

  const handleResendOtp = () => {
    const contact = contactMethod === 'email' ? email : phone;
    if (!contact.trim()) return;
    sendOtp(contact);
    setOtpError('');
    alert(`OTP resent to ${contact}`);
    console.log(`OTP resent to ${contact}`)
  };

  

  const handleProceed = () => {
    if (otpVerified) {
      navigate('/setnewpassword');
    } else {
      alert('Please verify OTP before proceeding.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-black">
      <div className="w-full max-w-md mx-auto p-5 shadow-xl bg-white backdrop-blur-md border border-gray-200 rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Forgot Password</h2>

        <button
          onClick={() => { setContactMethod('phone'); setShowOtpInput(false); setOtpVerified(false); }}
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-sm hover:bg-green-700 transition cursor-pointer"
        >
          Get OTP on Mobile
        </button>

        <button
          onClick={() => { setContactMethod('email'); setShowOtpInput(false); setOtpVerified(false); }}
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-medium rounded-sm hover:bg-green-700 transition cursor-pointer"
        >
          Get OTP on Email
        </button>

        {contactMethod === 'email' && (
          <div className="mt-4">
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <div className="absolute top-53 right-8 cursor-pointer hover:text-gray-700">
              <button type="button" onClick={handleSendOtp} className="w-full py-2 px-4 text-blue-800 font-medium rounded-xl transition cursor-pointer">
                Send OTP
              </button>
            </div>
          </div>
        )}

        {contactMethod === 'phone' && (
          <div className="mt-4">
            <InputField
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
            <div className="absolute top-53 right-8 cursor-pointer hover:text-gray-700">
              <button type="button" onClick={handleSendOtp} className="w-full py-2 px-4 text-blue-800 font-medium rounded-xl transition cursor-pointer">
                Send OTP
              </button>
            </div>
          </div>
        )}


        {showOtpInput && (
          <>
          {showOtpInput && (
            <p className="mb-2 text-sm text-gray-700">Enter OTP</p>
          )}
            <OtpInput
              length={6}
              ref={otpRef}
              contact={contactMethod === 'email' ? email : phone}
              error={otpError}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
            />
            {otpError && (
              <p className="text-sm text-red-500 mt-2 text-center">{otpError}</p>
            )}
            {otpSuccess && (
              <p className="text-sm text-green-600 mt-2 text-center">{otpSuccess}</p>
            )}
          </>

        )}

        <form>
          <button
            type="button"
            onClick={handleProceed}
            className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-sm hover:bg-green-700 transition cursor-pointer"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
