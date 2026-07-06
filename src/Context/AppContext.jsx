import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [activeModal, setActiveModal] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((current) => !current);
  }, []);

  const showModal = useCallback((modalName, modalProps = {}) => {
    setActiveModal({ name: modalName, props: modalProps });
  }, []);

  const hideModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const value = useMemo(
    () => ({
      activeModal,
      closeSidebar,
      globalLoading,
      hideModal,
      online,
      openSidebar,
      pageTitle,
      setGlobalLoading,
      setPageTitle,
      showModal,
      sidebarOpen,
      toggleSidebar,
    }),
    [
      activeModal,
      closeSidebar,
      globalLoading,
      hideModal,
      online,
      openSidebar,
      pageTitle,
      showModal,
      sidebarOpen,
      toggleSidebar,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
