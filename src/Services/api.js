import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const TOKEN_KEY =
  import.meta.env.VITE_TOKEN_KEY || "Bearilly_auth_token";

export const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token) => {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const clearStoredToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

export const unwrapData = (response) =>
  response?.data?.data ?? response?.data ?? response;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;

    const message =
      data?.message ||
      data?.error ||
      error?.message ||
      "Something went wrong";

    if (status === 401) {
      clearStoredToken();
    }

    return Promise.reject({
      status,
      message,
      data,
      originalError: error,
    });
  }
);

export default api;