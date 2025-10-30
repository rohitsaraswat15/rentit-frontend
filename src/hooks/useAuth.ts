import { useAuthContext } from "../context/useAuthContext";

export const useAuth = () => {
  const { user, login, logout, register } = useAuthContext();
  return { user, login, logout, register };
};
