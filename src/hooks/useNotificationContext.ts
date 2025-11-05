import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotificationContext must be used within NotificationProvider");
  return ctx;
};
