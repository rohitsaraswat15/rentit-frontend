import axiosInstance from './axiosInstance';
import type { User } from './authService';

const dummyUsers: User[] = [
  { id: '1', name: 'Tanya', email: 'user@example.com', role: 'user' },
  { id: '2', name: 'Elsa', email: 'admin@example.com', role: 'admin' },
];

const userService = {
    
  async getUserById(id: string): Promise<User | null> {
    try {
      const res = await axiosInstance.get(`/users/${id}`);
      return res.data;
    } catch {
      console.warn('API not available, using dummy data');
      return new Promise((resolve) =>
        setTimeout(() => {
          const found = dummyUsers.find((u) => u.id === id);
          resolve(found || null);
        }, 200)
      );
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const res = await axiosInstance.get('/users');
      return res.data;
    } catch {
      return new Promise((resolve) =>
        setTimeout(() => resolve(dummyUsers), 200)
      );
    }
  },
};

export default userService;
