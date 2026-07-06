import { useEffect, useState } from "react";
import AppRoutes from "./Routes/AppRoutes";
import authService from "./Services/authService";
import "./Styles/component.css";

const getAuthSnapshot = () => ({
  user: typeof window !== "undefined" ? authService.getCurrentUser() : null,
  isAuthenticated: typeof window !== "undefined" ? authService.isAuthenticated() : false,
  hasAccessCode: typeof window !== "undefined" ? authService.hasVerifiedAccessCode() : false,
});

const App = () => {
  const [authState, setAuthState] = useState(getAuthSnapshot);

  useEffect(() => {
    const syncAuthState = () => setAuthState(getAuthSnapshot());

    syncAuthState();
    window.addEventListener("auth:change", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("auth:change", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return (
    <AppRoutes
      user={authState.user}
      isAuthenticated={authState.isAuthenticated}
      hasAccessCode={authState.hasAccessCode}
    />
  );
};

export default App;
