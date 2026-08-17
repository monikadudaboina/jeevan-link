import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || ${import.meta.env.VITE_API_URL};

const systemPrompt = `
You are Jeevan Link's blood donation eligibility assistant.
Your only responsibility is to answer questions about blood donation eligibility based on standard donor safety guidelines.

You must:
- Only answer questions related to blood donation eligibility, deferrals, waiting periods, donor safety, medications, illness, surgery, pregnancy, travel, tattoos/piercings, iron levels, or similar donation rules.
- Reject any non-medical or off-topic question.
- If the user asks something unrelated to donation eligibility, respond exactly:
  "I can only help with blood donation eligibility and donor safety questions. Please ask about donation rules, deferrals, or recovery periods."
- Do not diagnose diseases or give personal medical advice outside blood donation screening.
- If unclear, advise the user to consult a licensed physician or their local blood center.
- Keep responses concise, clinically safe, and practical.
- Mention the waiting period or rule whenever relevant.
- Do not mention you are an AI. Do not use markdown tables.
`;

function EligibilityAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Ask a question about blood donation eligibility, like: 'Can I donate if I took antibiotics?'",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/gemini/eligibility-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to evaluate the question.");
      }

      setMessages((prev) => [...prev, { sender: "assistant", text: data.answer || "No answer available." }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: error.message || "Something went wrong while checking eligibility.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemini-panel eligibility-panel">
      <div className="gemini-header">
        <div className="gemini-icon">🤖</div>
        <div>
          <h3>Eligibility Assistant</h3>
          <p>Ask donation-related eligibility questions only.</p>
        </div>
      </div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <strong>{message.sender === "assistant" ? "Assistant" : "You"}</strong>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendQuestion();
          }}
          placeholder="Example: Can I donate if I took antibiotics?"
        />
        <button type="button" className="primary-button" onClick={sendQuestion} disabled={loading}>
          {loading ? "Checking..." : "Ask"}
        </button>
      </div>

      <div className="system-prompt-box">
        <strong>System Instruction</strong>
        <pre>{systemPrompt.trim()}</pre>
      </div>
    </div>
  );
}

export default EligibilityAssistant;
