// OTPInput.tsx
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

export interface OtpInputRef {
  getOtp: () => string;
  clearOtp: () => void;
}

interface OtpInputProps {
  length?: number;
  contact?: string;
  error?: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(({ length = 6, onVerify, onResend }, ref) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useImperativeHandle(ref, () => ({
    getOtp: () => otp.join(''),
    clearOtp: () => {
      const emptyOtp = new Array(length).fill('');
      setOtp(emptyOtp);
      inputRefs.current[0]?.focus();
    }
  }));

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center gap-3">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-lg border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
      </div>
      <div className="flex gap-15 mt-4 mb-4">
        <button
          onClick={() => onVerify(otp.join(''))}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-green-700 transition"
        >
          Verify OTP
        </button>
        <button
          onClick={() => {
            onResend();
            setOtp(new Array(length).fill(''));
          }}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
});

export default OtpInput;
