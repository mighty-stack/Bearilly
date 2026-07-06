import { DEFAULT_ERROR_MESSAGE, USER_ROLES } from "./constants";

export const classNames = (...values) => {
  return values
    .flat()
    .filter(Boolean)
    .join(" ");
};

export const createId = (prefix = "id") => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const debounce = (callback, delay = 400) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
};

export const sleep = (milliseconds = 300) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export const truncateText = (text = "", maxLength = 80) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
};

export const calculatePercentage = (value = 0, total = 0) => {
  if (!total || total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / total) * 100)));
};

export const normalizeList = (response, key) => {
  if (Array.isArray(response)) return response;
  if (key && Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export const parseErrorMessage = (error, fallback = DEFAULT_ERROR_MESSAGE) => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  return error.response?.data?.message || error.data?.message || error.message || fallback;
};

export const isAdminUser = (user) => {
  return user?.role === USER_ROLES.ADMIN;
};

export const isStudentUser = (user) => {
  return user?.role === USER_ROLES.STUDENT;
};

export const toTitleCase = (value = "") => {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
};

export const sortByDate = (items = [], key = "createdAt", direction = "desc") => {
  return [...items].sort((a, b) => {
    const first = new Date(a?.[key] || 0).getTime();
    const second = new Date(b?.[key] || 0).getTime();
    return direction === "asc" ? first - second : second - first;
  });
};

export const groupBy = (items = [], key) => {
  return items.reduce((groups, item) => {
    const groupKey = typeof key === "function" ? key(item) : item?.[key];
    const safeKey = groupKey || "Other";

    return {
      ...groups,
      [safeKey]: [...(groups[safeKey] || []), item],
    };
  }, {});
};

export const buildQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    searchParams.set(key, value);
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export default {
  buildQueryString,
  calculatePercentage,
  classNames,
  createId,
  debounce,
  getInitials,
  groupBy,
  isAdminUser,
  isStudentUser,
  normalizeList,
  parseErrorMessage,
  sleep,
  sortByDate,
  toTitleCase,
  truncateText,
};
