export const APP_NAME = "SkillPath";

export const USER_ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
};

export const STORAGE_KEYS = {
  TOKEN: "skillpath_auth_token",
  USER: "skillpath_user",
  ACCESS_CODE_VERIFIED: "skillpath_access_code_verified",
  THEME: "skillpath_theme",
  LAST_ROUTE: "skillpath_last_route",
};

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCESS_CODE: "/access-code",
  DASHBOARD: "/app/dashboard",
  LEARNING: "/app/learning",
  AI_TUTOR: "/app/ai-tutor",
  TOOLKIT: "/app/toolkit",
  ASSESSMENTS: "/app/assessments",
  SUBMISSIONS: "/app/submissions",
  PROFILE: "/app/profile",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_CODES: "/admin/codes",
  ADMIN_ASSESSMENTS: "/admin/assessments",
  ADMIN_SUBMISSIONS: "/admin/submissions",
};

export const LESSON_STATUS = {
  LOCKED: "locked",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const SUBMISSION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const ASSESSMENT_TYPES = [
  "Project",
  "Quiz",
  "Writing",
  "Practical",
];

export const TOOL_CATEGORIES = [
  "Learning",
  "Assessment",
  "Productivity",
  "Career",
];

export const STATUS_LABELS = {
  [SUBMISSION_STATUS.PENDING]: "Pending review",
  [SUBMISSION_STATUS.APPROVED]: "Approved",
  [SUBMISSION_STATUS.REJECTED]: "Needs revision",
  [LESSON_STATUS.LOCKED]: "Locked",
  [LESSON_STATUS.IN_PROGRESS]: "In progress",
  [LESSON_STATUS.COMPLETED]: "Completed",
};

export const STATUS_COLORS = {
  pending: "var(--warning)",
  approved: "var(--success)",
  rejected: "var(--danger)",
  locked: "var(--text-secondary)",
  in_progress: "var(--info)",
  completed: "var(--success)",
};

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
};

export const FILE_LIMITS = {
  MAX_SUBMISSION_SIZE: 10 * 1024 * 1024,
  ACCEPTED_SUBMISSION_TYPES: [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "application/zip",
  ],
};

export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export default {
  APP_NAME,
  ASSESSMENT_TYPES,
  DEFAULT_ERROR_MESSAGE,
  FILE_LIMITS,
  LESSON_STATUS,
  PAGINATION_DEFAULTS,
  ROUTES,
  STATUS_COLORS,
  STATUS_LABELS,
  STORAGE_KEYS,
  SUBMISSION_STATUS,
  TOOL_CATEGORIES,
  USER_ROLES,
};
