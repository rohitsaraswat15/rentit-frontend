import React, { useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser } from '../services/authService';
import type { User, LoginData, RegisterData } from '../services/authService';
import { AuthContext } from '../context/AuthContext';


// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (loginData: LoginData) => Promise<void>;
//   register: (registerData: RegisterData) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContext>({
//   user: null,
//   loading: true,
//   login: async () => {},
//   register: async () => {},
//   logout: () => {},
// });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //Load user from localStorage on app start or refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  //Login user (calls backend)
  const login = async (loginData: LoginData) => {
    const res = await loginUser(loginData);
    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      //sync login status across tabs
      window.dispatchEvent(new Event('storage'));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  //Register user (calls backend)
  const register = async (registerData: RegisterData) => {
    const res = await registerUser(registerData);
    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      //sync registration/login status across tabs
      window.dispatchEvent(new Event('storage'));
    } else {
      throw new Error('Registration failed');
    }
  };

  //Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};