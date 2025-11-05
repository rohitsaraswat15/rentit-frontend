import { createContext } from "react";
import type { NotificationItem } from "../provider/NotificationProvider";

export interface NotificationContextType {
    notifications: NotificationItem[];
    sendNotification: (data: NotificationItem) => void;
    updateNotificationStatus: (id: string, status: "approved") => void;
    clearNotifications: (receiverId: string) => void;
    marksAsRead: (id: string) => void;
}

 export const NotificationContext = createContext<NotificationContextType | null>(null);
