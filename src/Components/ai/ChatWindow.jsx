import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages = [], onSend, loading = false }) => (
  <section className="app-card overflow-hidden d-flex flex-column" style={{ minHeight: "70vh" }}>
    <div className="p-3 border-bottom bg-white">
      <h1 className="h5 fw-bold mb-0">AI Tutor</h1>
      <p className="text-muted-app mb-0 small">Ask quick questions while you learn.</p>
    </div>
    <div className="flex-grow-1 p-3 overflow-auto" style={{ background: "var(--background-color)" }}>
      {messages.map((message) => (
        <ChatMessage key={message.id || `${message.role}-${message.content}`} {...message} />
      ))}
      {loading && <ChatMessage content="Thinking..." />}
    </div>
    <ChatInput onSend={onSend} disabled={loading} />
  </section>
);

export default ChatWindow;