import { sendMessageToClaude } from "@/api/ai.axios";
import React, { useState, FormEvent, ChangeEvent } from "react";

interface Message {
  role: "user" | "assistant" | "error";
  content: string;
}

const Chatgpt: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await sendMessageToClaude(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Failed to get response from Claude:", error);
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Failed to get response." },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Chatgpt;
