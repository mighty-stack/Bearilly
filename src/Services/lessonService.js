import api, { unwrapData } from "./api";

const getLessons = async (params = {}) => {
  const response = await api.get("/api/lessons", { params });
  return unwrapData(response);
};

const getLessonById = async (lessonId) => {
  const response = await api.get(`/api/lessons/${lessonId}`);
  return unwrapData(response);
};

const getLessonProgress = async () => {
  const response = await api.get("/api/lessons/progress");
  return unwrapData(response);
};

const saveLessonProgress = async (lessonId, payload) => {
  const response = await api.patch(`/api/lessons/${lessonId}/progress`, payload);
  return unwrapData(response);
};

const markLessonComplete = async (lessonId) => {
  const response = await api.post(`/api/lessons/${lessonId}/complete`);
  return unwrapData(response);
};

const submitLessonQuiz = async (lessonId, answers) => {
  const response = await api.post(`/api/lessons/${lessonId}/quiz`, { answers });
  return unwrapData(response);
};

const lessonService = {
  getLessonById,
  getLessonProgress,
  getLessons,
  markLessonComplete,
  saveLessonProgress,
  submitLessonQuiz,
};

export default lessonService;
