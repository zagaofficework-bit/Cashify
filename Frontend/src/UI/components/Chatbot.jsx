import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };

    const botReply = {
      from: "bot",
      text: "Thanks for your message! Our team will contact you soon.",
    };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-teal-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-teal-700"
      >
        <FontAwesomeIcon icon={faComments} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl flex flex-col">
          
          {/* Header */}
          <div className="bg-teal-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span>Support Chat</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto h-64 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[75%] ${
                  msg.from === "user"
                    ? "ml-auto bg-teal-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex">
            <input
            onKeyDown={(e)=>{e.key === 'Enter' && sendMessage()}}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="mr-3 text-teal-500"
            >
              <FontAwesomeIcon icon={faPaperPlane} size="lg"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
