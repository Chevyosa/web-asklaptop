import { useState } from "react";
import { ArrowDown } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [chatInput, setChatInput] = useState("");

  const handleSend = () => {
    if (chatInput.trim() !== "") {
      onSend(chatInput);

      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 0); // Biar pasti setelah render
    }
  };

  return (
    <div className="flex items-center bg-white p-3 rounded-2xl w-full max-w-4xl shadow-xl shadow-white/10">
      <input
        type="text"
        placeholder="I need a laptop for.."
        className="flex-1 px-3 py-2 bg-transparent text-[#20294C] placeholder-[#5B738B] rounded-full focus:ring-0 focus:outline-none w-full"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
      />
      <button
        className="flex items-center gap-2 bg-[#F05454] text-white px-5 py-3 rounded-2xl shadow-md shadow-black/20 hover:bg-red-600 transition"
        onClick={handleSend}
      >
        Send <ArrowDown size={18} />
      </button>
    </div>
  );
}
