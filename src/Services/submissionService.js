import api, { unwrapData } from "./api";

const toSubmissionFormData = (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

const getMySubmissions = async (params = {}) => {
  const response = await api.get("/api/submission/me", { params });
  return unwrapData(response);
};

const getSubmissions = async (params = {}) => {
  const response = await api.get("/api/submission", { params });
  return unwrapData(response);
};

const getSubmissionById = async (submissionId) => {
  const response = await api.get(`/api/submission/${submissionId}`);
  return unwrapData(response);
};

const createSubmission = async (payload) => {
  const hasFile = Boolean(payload.file || payload.files);
  const body = hasFile ? toSubmissionFormData(payload) : payload;

  const response = await api.post("/api/submission", body, {
    headers: hasFile ? { "Content-Type": "multipart/form-data" } : undefined,
  });

  return unwrapData(response);
};

const updateSubmission = async (submissionId, payload) => {
  const response = await api.patch(`/api/submission/${submissionId}`, payload);
  return unwrapData(response);
};

const deleteSubmission = async (submissionId) => {
  const response = await api.delete(`/api/submission/${submissionId}`);
  return unwrapData(response);
};

const reviewSubmission = async (submissionId, payload) => {
  const response = await api.patch(
    `/api/submission/${submissionId}/review`,
    payload,
  );
  return unwrapData(response);
};

const submissionService = {
  createSubmission,
  deleteSubmission,
  getMySubmissions,
  getSubmissionById,
  getSubmissions,
  reviewSubmission,
  updateSubmission,
};

export default submissionService;
