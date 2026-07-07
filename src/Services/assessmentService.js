import api, { unwrapData } from "./api";

const getAssessments = async (params = {}) => {
  const response = await api.get("/api/assessments", { params });
  return unwrapData(response);
};

const getAssessmentById = async (assessmentId) => {
  const response = await api.get(`/api/assessments/${assessmentId}`);
  return unwrapData(response);
};

const createAssessment = async (payload) => {
  const response = await api.post("/api/assessments", payload);
  return unwrapData(response);
};

const updateAssessment = async (assessmentId, payload) => {
  const response = await api.patch(`/api/assessments/${assessmentId}`, payload);
  return unwrapData(response);
};

const deleteAssessment = async (assessmentId) => {
  const response = await api.delete(`/api/assessments/${assessmentId}`);
  return unwrapData(response);
};

const publishAssessment = async (assessmentId) => {
  const response = await api.post(`/api/assessments/${assessmentId}/publish`);
  return unwrapData(response);
};

const getAssessmentSubmissions = async (assessmentId, params = {}) => {
  const response = await api.get(`/api/assessments/${assessmentId}/submissions`, {
    params,
  });
  return unwrapData(response);
};

const assessmentService = {
  createAssessment,
  deleteAssessment,
  getAssessmentById,
  getAssessmentSubmissions,
  getAssessments,
  publishAssessment,
  updateAssessment,
};

export default assessmentService;
