import api, { unwrapData } from "./api";

const sendTutorMessage = async ({
  message,
  conversationId,
  lessonId,
  context,
}) => {
  const response = await api.post("/api/ai/chat", {
    message,
    conversationId,
    lessonId,
    context,
  });

  return unwrapData(response);
};

const getTutorConversations = async () => {
  const response = await api.get("/api/ai/conversations");
  return unwrapData(response);
};

const getTutorConversationById = async (conversationId) => {
  const response = await api.get(`/api/ai/conversations/${conversationId}`);
  return unwrapData(response);
};

const deleteTutorConversation = async (conversationId) => {
  const response = await api.delete(
    `/api/ai/conversations/${conversationId}`,
  );
  return unwrapData(response);
};

const getSuggestedPrompts = async (params = {}) => {
  const response = await api.get("/api/ai/vprompts", { params });
  return unwrapData(response);
};

const aiService = {
  deleteTutorConversation,
  getSuggestedPrompts,
  getTutorConversationById,
  getTutorConversations,
  sendTutorMessage,
};

export default aiService;
