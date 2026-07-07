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
  const response = await api.get("/api/submissions/me", { params });
  return unwrapData(response);
};

const getSubmissions = async (params = {}) => {
  const response = await api.get("/api/submissions", { params });
  return unwrapData(response);
};

const getSubmissionById = async (submissionId) => {
  const response = await api.get(`/api/submissions/${submissionId}`);
  return unwrapData(response);
};

const createSubmission = async (payload) => {
  const hasFile = Boolean(payload.file || payload.files);
  const body = hasFile ? toSubmissionFormData(payload) : payload;

  const response = await api.post("/api/submissions", body, {
    headers: hasFile ? { "Content-Type": "multipart/form-data" } : undefined,
  });

  return unwrapData(response);
};

const updateSubmission = async (submissionId, payload) => {
  const response = await api.patch(`/api/submissions/${submissionId}`, payload);
  return unwrapData(response);
};

const deleteSubmission = async (submissionId) => {
  const response = await api.delete(`/api/submissions/${submissionId}`);
  return unwrapData(response);
};

const reviewSubmission = async (submissionId, payload) => {
  const response = await api.patch(
    `/api/submissions/${submissionId}/review`,
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
