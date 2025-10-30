import { createContext } from 'react';
import type { User, RegisterData, LoginData } from '../services/authService';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  register: (registerData: RegisterData) => Promise<void>;
  logout: () => void;
}

// ✅ Create only the context (no hooks or logic)
export const AuthContext = createContext<AuthContextType | null>(null);
