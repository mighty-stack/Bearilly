import api, { unwrapData } from "./api";

const getTools = async (params = {}) => {
  const response = await api.get("/tools", { params });
  return unwrapData(response);
};

const getToolById = async (toolId) => {
  const response = await api.get(`/tools/${toolId}`);
  return unwrapData(response);
};

const getToolCategories = async () => {
  const response = await api.get("/tools/categories");
  return unwrapData(response);
};

const runTool = async (toolId, payload) => {
  const response = await api.post(`/tools/${toolId}/run`, payload);
  return unwrapData(response);
};

const saveToolResult = async (toolId, payload) => {
  const response = await api.post(`/tools/${toolId}/results`, payload);
  return unwrapData(response);
};

const toolkitService = {
  getToolById,
  getToolCategories,
  getTools,
  runTool,
  saveToolResult,
};

export default toolkitService;
