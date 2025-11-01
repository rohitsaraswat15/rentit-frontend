// Ensure /auth/send-otp, /auth/verify-otp, and /auth/register routes are implemented on backend.
import axiosInstance from './axiosInstance';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

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
  user?: User;
  token?: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface OtpResponse {
  success: boolean;
  otp?: string;
  message?: string;
}

// 🧩 STEP 1: Initialize Dummy Users List in LocalStorage (only once)
const initializeDummyUsers = () => {
  const existing = localStorage.getItem("users");
  if (!existing) {
    const defaultUsers: User[] = [
      { id: "2", name: "Elsa", email: "admin@example.com", role: "admin" },
      { id: "1", name: "Tanya", email: "user1@example.com", role: "user" },
      { id: "3", name: "Krishna", email: "user2@example.com", role: "user" },
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    console.log("✅ Dummy users initialized in localStorage:", defaultUsers);
  }
};
initializeDummyUsers();

// --- OTP Functions ---
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

// --- Register User ---
export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const res = await axiosInstance.post('/auth/register', data);
    return res.data;
  } catch {
    // dummy fallback
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log('Dummy register user:', data);

        // 🧩 Add registered user to localStorage users list
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const newUser: User = {
          id: (users.length + 1).toString(),
          name: data.fullName,
          email: data.email,
          role: "user",
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        window.dispatchEvent(new Event("storageUpdate")); // refresh stats

        resolve({ success: true, message: 'Registered successfully (dummy)', user: newUser });
      }, 100)
    );
  }
};

// --- Login User ---
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const res = await axiosInstance.post('/auth/login', data);
    return res.data;
  } catch {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (data.email === 'user1@example.com' && data.password === 'User1@123') {
          resolve({
            success: true,
            token: 'dummy-user-token',
            user: {
              id: '1',
              name: 'Tanya',
              email: data.email,
              role: 'user',
            },
          });
        } else if (data.email === 'user2@example.com' && data.password === 'User2@123') {
          resolve({
            success: true,
            token: 'dummy-user-token',
            user: {
              id: '3',
              name: 'Krishna',
              email: data.email,
              role: 'user',
            },
          });
        } else if (data.email === 'admin@example.com' && data.password === 'Admin@123') {
          resolve({
            success: true,
            token: 'dummy-admin-token',
            user: {
              id: '2',
              name: 'Elsa',
              email: data.email,
              role: 'admin',
            },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 100)
    );
  }
};
