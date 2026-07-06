const ChatMessage = ({ role = "assistant", content, time }) => {
  const isUser = role === "user";

  return (
    <div className={`d-flex mb-3 ${isUser ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className="px-3 py-2"
        style={{
          maxWidth: "82%",
          borderRadius: "16px",
          background: isUser ? "var(--primary-color)" : "var(--white)",
          color: isUser ? "var(--white)" : "var(--text-primary)",
          border: isUser ? "0" : "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <p className="mb-1">{content}</p>
        {time && <small className={isUser ? "opacity-75" : "text-muted-app"}>{time}</small>}
      </div>
    </div>
  );
};

export default ChatMessage;