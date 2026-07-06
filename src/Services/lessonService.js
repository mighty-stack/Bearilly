import api, { unwrapData } from "./api";

const getLessons = async (params = {}) => {
  const response = await api.get("/lessons", { params });
  return unwrapData(response);
};

const getLessonById = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}`);
  return unwrapData(response);
};

const getLessonProgress = async () => {
  const response = await api.get("/lessons/progress");
  return unwrapData(response);
};

const saveLessonProgress = async (lessonId, payload) => {
  const response = await api.patch(`/lessons/${lessonId}/progress`, payload);
  return unwrapData(response);
};

const markLessonComplete = async (lessonId) => {
  const response = await api.post(`/lessons/${lessonId}/complete`);
  return unwrapData(response);
};

const submitLessonQuiz = async (lessonId, answers) => {
  const response = await api.post(`/lessons/${lessonId}/quiz`, { answers });
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
