import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import authService from "../Services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccessCode, setHasAccessCode] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuthState = useCallback(() => {
    const authenticated = authService.isAuthenticated();
    const currentUser = authenticated ? authService.getCurrentUser() : null;

    setUser(currentUser);
    setIsAuthenticated(authenticated);
    setHasAccessCode(authService.hasVerifiedAccessCode());

    return {
      user: currentUser,
      isAuthenticated: authenticated,
      hasAccessCode: authService.hasVerifiedAccessCode(),
    };
  }, []);

  useEffect(() => {
    refreshAuthState();
    setLoading(false);
  }, [refreshAuthState]);

  const login = useCallback(async (payload) => {
    setLoading(true);

    try {
      const session = await authService.login(payload);
      setUser(session.user);
      setIsAuthenticated(true);
      setHasAccessCode(authService.hasVerifiedAccessCode());
      return session;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);

    try {
      const session = await authService.register(payload);
      setUser(session.user);
      setIsAuthenticated(true);
      setHasAccessCode(authService.hasVerifiedAccessCode());
      return session;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyAccessCode = useCallback(async (code) => {
    const result = await authService.verifyAccessCode(code);
    setHasAccessCode(true);
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setHasAccessCode(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      isAuthenticated,
      hasAccessCode,
      isAdmin: user?.role === "admin",
      login,
      logout,
      refreshAuthState,
      register,
      verifyAccessCode,
    }),
    [
      hasAccessCode,
      isAuthenticated,
      loading,
      login,
      logout,
      refreshAuthState,
      register,
      user,
      verifyAccessCode,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
