import React, { useState, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { useAuthContext } from "../context/useAuthContext";
 
export interface NotificationItem {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productAmount: string;
  timestamp: number;
  status: "pending" | "approved";
  message: string;
  read?: boolean;
  date?: string;
  time?: string;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { user } = useAuthContext();

  // Load notifications from localStorage for current user
  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(`notifications_${user.id}`);
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      setNotifications([]);
    }
  }, [user]);

  // Save notifications to localStorage for current user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  const sendNotification = (data: NotificationItem) => {
    // Save for receiver
    const receiverKey = `notifications_${data.receiverId}`;
    const existingReceiverNotifications = JSON.parse(localStorage.getItem(receiverKey) || "[]");
    localStorage.setItem(receiverKey, JSON.stringify([...existingReceiverNotifications, data]));

    // Save for sender (optional)
    const senderKey = `notifications_${data.senderId}`;
    const existingSenderNotifications = JSON.parse(localStorage.getItem(senderKey) || "[]");
    localStorage.setItem(senderKey, JSON.stringify([...existingSenderNotifications, data]));

    // Update state if current user is either sender or receiver
    if (user && (user.id === data.receiverId || user.id === data.senderId)) {
      setNotifications((prev) => [...prev, data]);
    }
  };

  const updateNotificationStatus = (id: string, status: "approved") => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, status } : n));
    setNotifications(updated);
  };

  const clearNotifications = (receiverId: string) => {
    const filtered = notifications.filter((n) => n.receiverId !== receiverId);
    setNotifications(filtered);
  };

  const marksAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, sendNotification, updateNotificationStatus, clearNotifications, marksAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
