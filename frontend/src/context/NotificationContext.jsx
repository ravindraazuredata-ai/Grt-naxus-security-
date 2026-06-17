import { createContext, useState } from "react";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (payload) => {
    setNotifications((prev) => [{ id: Date.now(), ...payload }, ...prev]);
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
}
