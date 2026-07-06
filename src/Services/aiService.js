import api, { unwrapData } from "./api";

const sendTutorMessage = async ({
  message,
  conversationId,
  lessonId,
  context,
}) => {
  const response = await api.post("/ai/tutor/chat", {
    message,
    conversationId,
    lessonId,
    context,
  });

  return unwrapData(response);
};

const getTutorConversations = async () => {
  const response = await api.get("/ai/tutor/conversations");
  return unwrapData(response);
};

const getTutorConversationById = async (conversationId) => {
  const response = await api.get(`/ai/tutor/conversations/${conversationId}`);
  return unwrapData(response);
};

const deleteTutorConversation = async (conversationId) => {
  const response = await api.delete(
    `/ai/tutor/conversations/${conversationId}`,
  );
  return unwrapData(response);
};

const getSuggestedPrompts = async (params = {}) => {
  const response = await api.get("/ai/tutor/prompts", { params });
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
