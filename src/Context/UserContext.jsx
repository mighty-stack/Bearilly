import { createContext, useCallback, useMemo, useState } from "react";

export const UserContext = createContext(null);

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState({
    completedLessons: 0,
    totalLessons: 0,
    completedAssessments: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const updateProfile = useCallback((updates) => {
    setProfile((current) => ({ ...current, ...updates }));
  }, []);

  const updateProgress = useCallback((updates) => {
    setProgress((current) => ({ ...current, ...updates }));
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((current) => [
      {
        id: createId(),
        read: false,
        createdAt: new Date().toISOString(),
        ...notification,
      },
      ...current,
    ]);
  }, []);

  const markNotificationRead = useCallback((notificationId) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notificationId ? { ...item, read: true } : item
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      progress,
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
      addNotification,
      clearNotifications,
      markNotificationRead,
      updateProfile,
      updateProgress,
    }),
    [
      addNotification,
      clearNotifications,
      markNotificationRead,
      notifications,
      profile,
      progress,
      updateProfile,
      updateProgress,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
