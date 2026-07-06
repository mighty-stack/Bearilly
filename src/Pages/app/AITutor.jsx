import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChatWindow from "../../Components/ai/ChatWindow";
import SuggestedPrompts from "../../Components/ai/SuggestedPrompt";
import PageHeader from "../../Components/common/PageHeader";
import aiService from "../../Services/aiService";

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I am your AI tutor. What would you like help with?",
      time: "Now",
    },
  ]);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    let ignore = false;

    const loadPrompts = async () => {
      try {
        const result = await aiService.getSuggestedPrompts();
        const nextPrompts = Array.isArray(result) ? result : result?.prompts || [];

        if (!ignore) {
          setPrompts(nextPrompts.map((prompt) => prompt.text || prompt.content || prompt));
        }
      } catch {
        if (!ignore) {
          setPrompts(["Explain this lesson simply", "Give me a practice task", "Help me improve my submission"]);
        }
      }
    };

    loadPrompts();
    return () => {
      ignore = true;
    };
  }, []);

  const sendMessage = async (content) => {
    const userMessage = { id: crypto.randomUUID(), role: "user", content, time: "Now" };
    setMessages((current) => [...current, userMessage]);

    try {
      const response = await aiService.sendTutorMessage({ message: content });
      const assistantReply = response?.message || response?.reply || "I can help you with that. Try breaking the problem into a small next step.";

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantReply,
          time: "Now",
        },
      ]);
    } catch (error) {
      toast.error(error?.message || "Unable to reach the AI tutor");
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I’m not able to respond right now. Please try again in a moment.",
          time: "Now",
        },
      ]);
    }
  };

  return (
    <>
      <PageHeader title="AI Tutor" subtitle="Ask questions while you learn." />
      <SuggestedPrompts prompts={prompts} onSelect={sendMessage} />
      <ChatWindow messages={messages} onSend={sendMessage} />
    </>
  );
};

export default AITutor;