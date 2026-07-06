const DEFAULT_LOCALE = "en-US";

const toDate = (value) => {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDate = (value, options = {}) => {
  const date = toDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(date);
};

export const formatDateTime = (value, options = {}) => {
  const date = toDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    ...options,
  }).format(date);
};

export const formatTime = (value, options = {}) => {
  const date = toDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    ...options,
  }).format(date);
};

export const getRelativeDate = (value) => {
  const date = toDate(value);
  if (!date) return "";

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  return formatDate(date);
};

export const getDueStatus = (dueDate) => {
  const date = toDate(dueDate);
  if (!date) return { label: "No due date", status: "neutral" };

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) return { label: "Overdue", status: "danger" };
  if (diffDays <= 1) return { label: "Due soon", status: "warning" };
  return { label: `Due ${formatDate(date)}`, status: "neutral" };
};

export const formatDuration = (minutes = 0) => {
  const totalMinutes = Number(minutes) || 0;
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (hours && remainingMinutes) return `${hours}h ${remainingMinutes}m`;
  if (hours) return `${hours}h`;
  return `${remainingMinutes}m`;
};

export const isPastDate = (value) => {
  const date = toDate(value);
  return date ? date.getTime() < Date.now() : false;
};

export default {
  formatDate,
  formatDateTime,
  formatDuration,
  formatTime,
  getDueStatus,
  getRelativeDate,
  isPastDate,
};
