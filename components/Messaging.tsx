
import React, { useState } from 'react';
import { ChatMessage } from '../types';

const Messaging: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Armin Fanatic', text: "Did you hear the new resonance session?", timestamp: '10:30 AM', isMe: false },
    { id: '2', sender: 'Me', text: "Absolutely beautiful. The layering was perfection.", timestamp: '10:32 AM', isMe: true },
    { id: '3', sender: 'Armin Fanatic', text: "Meeting at the hub tomorrow?", timestamp: '10:35 AM', isMe: false },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Me',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages([...messages, msg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] glass-panel rounded-[3rem] overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white/30">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img src="https://picsum.photos/seed/armin/100/100" className="w-12 h-12 rounded-full border border-black/5" alt="avatar" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h4 className="font-normal text-base text-black">Armin Fanatic</h4>
            <p className="text-[9px] text-emerald-500 font-bold tracking-[0.2em] uppercase">Active</p>
          </div>
        </div>
        <button className="text-black/30 hover:text-black transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={1} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-10 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl ${
              msg.isMe 
                ? 'bg-black text-white rounded-tr-none shadow-lg shadow-black/5' 
                : 'bg-white/60 text-black rounded-tl-none border border-black/5'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-2 uppercase tracking-widest ${msg.isMe ? 'text-white/40' : 'text-black/30'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-black/5 bg-white/20">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="w-full bg-white/60 border border-black/5 rounded-[2rem] py-4 pl-6 pr-16 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/10 placeholder-black/20"
          />
          <button
            onClick={sendMessage}
            className="absolute right-3 p-3 text-black hover:text-black/60 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
