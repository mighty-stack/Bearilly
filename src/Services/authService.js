import { jwtDecode } from "jwt-decode";
import api, { clearStoredToken, getStoredToken, setStoredToken, unwrapData } from "./api";
let USER_KEY
let ACCESS_CODE_KEY 

try {
  const env = typeof globalThis !== 'undefined' ? globalThis.process?.env : undefined;
  if (env) {
    
    USER_KEY = env.USER_KEY;
    ACCESS_CODE_KEY = env.ACCESS_CODE_KEY;
  }
} catch {
  USER_KEY= USER_KEY || undefined;
  ACCESS_CODE_KEY = ACCESS_CODE_KEY || undefined;
}


const safeDecodeToken = (token) => {
  try {
    return token ? jwtDecode(token) : null;
  } catch {
    return null;
  }
};

const getStoredUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

const setStoredUser = (user) => {
  if (typeof window === "undefined") return;

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

const normalizeAuthResponse = (response) => {
  const data = unwrapData(response);
  const token = data?.token || data?.accessToken || data?.jwt || null;
  const decoded = safeDecodeToken(token);
  const user = data?.user || data?.profile || decoded || null;

  return {
    ...data,
    token,
    user,
  };
};

const emitAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:change"));
  }
};

const saveAuthSession = (session) => {
  if (session?.token) setStoredToken(session.token);
  if (session?.user) setStoredUser(session.user);
  emitAuthChange();
  return session;
};

const register = async (payload) => {
  const response = await api.post("api/auth/register", payload);
  return saveAuthSession(normalizeAuthResponse(response));
};

const login = async (payload) => {
  const response = await api.post("api/auth/login", payload);
  return saveAuthSession(normalizeAuthResponse(response));
};

const verifyAccessCode = async (code) => {
  const response = await api.post("api/auth/access-code", { code });
  const data = unwrapData(response);
  const accepted = data?.valid ?? data?.accepted ?? true;

  if (typeof window !== "undefined" && accepted) {
    localStorage.setItem(ACCESS_CODE_KEY, "true");
    emitAuthChange();
  }

  return data;
};

const getCurrentUser = () => {
  const storedUser = getStoredUser();
  if (storedUser) return storedUser;

  const decoded = safeDecodeToken(getStoredToken());
  return decoded || null;
};

const isTokenExpired = (token = getStoredToken()) => {
  const decoded = safeDecodeToken(token);
  if (!decoded?.exp) return !token;
  return decoded.exp * 1000 < Date.now();
};

const isAuthenticated = () => Boolean(getStoredToken()) && !isTokenExpired();

const hasVerifiedAccessCode = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ACCESS_CODE_KEY) === "true";
};

const logout = () => {
  clearStoredToken();

  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_CODE_KEY);
  }

  emitAuthChange();
};

const authService = {
  getCurrentUser,
  hasVerifiedAccessCode,
  isAuthenticated,
  isTokenExpired,
  login,
  logout,
  register,
  saveAuthSession,
  verifyAccessCode,
};

export default authService;
