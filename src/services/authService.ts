//Ensure /auth/send-otp, /auth/verify-otp, and /auth/register routes are implemented on backend.

import axiosInstance from './axiosInstance';

export interface RegisterData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export interface OtpResponse {
  success: boolean;
  otp?: string;
  message?: string;
}

// Send OTP
export const sendOtp = async (contact: string): Promise<OtpResponse> => {
  try {
    const res = await axiosInstance.post('/auth/send-otp', { contact });
    return res.data;
  } catch {
    console.warn('API failed, using dummy OTP');
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true, otp: '123456' }), 100)
    );
  }
};

// Verify OTP
export const verifyOtp = async (otp: string): Promise<{ success: boolean }> => {
  try {
    const res = await axiosInstance.post('/auth/verify-otp', { otp });
    return res.data;
  } catch {
    // fallback dummy logic
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (otp === '123456') resolve({ success: true });
        else reject({ success: false, message: 'Invalid OTP' });
      }, 100)
    );
  }
};

// Register user
export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const res = await axiosInstance.post('/auth/register', data);
    return res.data;
  } catch {
    // dummy fallback
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log('Dummy register user:', data);
        resolve({ success: true, message: 'Registered successfully (dummy)' });
      }, 100)
    );
  }
};

// Login user
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const res = await axiosInstance.post('/auth/login', data);
    return res.data;
  } catch {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (data.email === 'test@example.com' && data.password === 'Password@123') {
          resolve({
            success: true,
            token: 'dummy-token',
            user: {
              name: 'Test User',
              email: data.email,
            },
          });
        } else {
           reject(new Error('Invalid credentials'));
        }
      }, 100)
    );
  }
};
