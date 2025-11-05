import { useEffect, useRef, useState, useMemo } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useNotificationContext } from "../../hooks/useNotificationContext";
import { useAuthContext } from "../../context/useAuthContext";

const NotificationBell = () => {
  const { notifications, marksAsRead } = useNotificationContext();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  // Memoize filtered notifications to avoid re-renders and ESLint warnings
  const userNotifications = useMemo(() => {
    if (!user) return [];
    return notifications.filter((n) => n.receiverId === user.id);
  }, [notifications, user]);

  const unreadCount = useMemo(() => {
    return userNotifications.filter((n) => !n.read).length;
  }, [userNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        if (open && user) {
          userNotifications.forEach((n) => {
            if (!n.read) marksAsRead(n.id);
          });
        }
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, userNotifications, marksAsRead, user]);

  if (!user) return null;

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => {
          if (open) {
            userNotifications.forEach((n) => {
              if (!n.read) marksAsRead(n.id);
            });
          }
          setOpen((prev) => !prev);
        }}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <HiOutlineBellAlert size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg rounded-md z-50">
          <div className="px-3 py-2 border-b font-semibold bg-purple-400 text-white">Notifications</div>
            <div className="max-h-150 overflow-y-auto scrollbar-hide">
          {userNotifications.length === 0 ? (
            <p className="text-sm text-gray-500 p-3">No new notifications</p>
          ) : (
            userNotifications
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((n) => (
                <div key={n.id} className="flex gap-5 p-3">
                    <div
                  key={n.id}
                  className={`p-3 text-sm border-b last:border-none transition ${n.read
                    ? "bg-white text-gray-600"
                    : "bg-purple-100 hover:bg-purple-200 text-gray-800"
                    }`}
                >
                  <p>
                    <span className="font-medium">{n.senderName}</span>{" "}
                    wants to get <strong>{n.productTitle}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    {n.date && n.time ? `${n.date} — ${n.time}` : new Date(n.timestamp).toLocaleString()}
                  </p>
                </div>
                <div key={n.id} >
                  <div className="w-15 h-15 md:w-15 md:h-15 flex items-center justify-center mr-6">
                  <img
                    src={n.productImage}
                    alt={n.productTitle}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
                </div>
                </div>
                 
              ))
          )}
        </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
