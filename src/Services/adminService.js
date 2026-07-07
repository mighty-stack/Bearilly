import api, { unwrapData } from "./api";

const getAdminStats = async () => {
  const response = await api.get("/api/admin/stats");
  return unwrapData(response);
};

const getUsers = async (params = {}) => {
  const response = await api.get("/api/admin/users", { params });
  return unwrapData(response);
};

const getUserById = async (userId) => {
  const response = await api.get(`/api/admin/users/${userId}`);
  return unwrapData(response);
};

const createUser = async (payload) => {
  const response = await api.post("/api/admin/users", payload);
  return unwrapData(response);
};

const updateUser = async (userId, payload) => {
  const response = await api.patch(`/api/admin/users/${userId}`, payload);
  return unwrapData(response);
};

const toggleUserStatus = async (userId, active) => {
  const response = await api.patch(`/api/admin/users/${userId}/status`, { active });
  return unwrapData(response);
};

const deleteUser = async (userId) => {
  const response = await api.delete(`/api/admin/users/${userId}`);
  return unwrapData(response);
};

const getAccessCodes = async (params = {}) => {
  const response = await api.get("/api/admin/access-codes", { params });
  return unwrapData(response);
};

const createAccessCode = async (payload) => {
  const response = await api.post("/api/admin/access-codes", payload);
  return unwrapData(response);
};

const updateAccessCode = async (codeId, payload) => {
  const response = await api.patch(`/api/admin/access-codes/${codeId}`, payload);
  return unwrapData(response);
};

const disableAccessCode = async (codeId) => {
  const response = await api.patch(`/api/admin/access-codes/${codeId}/disable`);
  return unwrapData(response);
};

const deleteAccessCode = async (codeId) => {
  const response = await api.delete(`/api/admin/access-codes/${codeId}`);
  return unwrapData(response);
};

const getAdminAssessments = async (params = {}) => {
  const response = await api.get("/api/admin/assessments", { params });
  return unwrapData(response);
};

const getAdminSubmissions = async (params = {}) => {
  const response = await api.get("/api/admin/submissions", { params });
  return unwrapData(response);
};

const reviewAdminSubmission = async (submissionId, payload) => {
  const response = await api.patch(
    `/api/admin/submissions/${submissionId}/review`,
    payload,
  );
  return unwrapData(response);
};

const adminService = {
  createAccessCode,
  createUser,
  deleteAccessCode,
  deleteUser,
  disableAccessCode,
  getAccessCodes,
  getAdminAssessments,
  getAdminStats,
  getAdminSubmissions,
  getUserById,
  getUsers,
  reviewAdminSubmission,
  toggleUserStatus,
  updateAccessCode,
  updateUser,
};

export default adminService;
