import { useState } from "react";
import { FiSend } from "react-icons/fi";
import Button from "../common/Button";

const ChatInput = ({ onSend, disabled = false, placeholder = "Ask your AI tutor..." }) => {
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setMessage("");
  };

  return (
    <form className="d-flex gap-2 bg-white border-top p-2" onSubmit={submit}>
      <input
        className="form-control app-input"
        value={message}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit" icon={FiSend} disabled={disabled || !message.trim()}>
        <span className="visually-hidden">Send</span>
      </Button>
    </form>
  );
};

export default ChatInput;