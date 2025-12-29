import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Mahasiswa } from '../types';
import { Chat } from '@google/genai';

interface AiCompanionProps {
  user: Mahasiswa;
}

const AiCompanion: React.FC<AiCompanionProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Halo ${user.nama}. Aku Sora.\nAda yang mau diceritain hari ini?`,
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatSessionRef.current = createChatSession();
  }, []);

  // Scroll to bottom logic
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await sendMessageToGemini(chatSessionRef.current, userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper to remove markdown symbols for cleaner text
  const cleanText = (text: string) => {
    return text.replace(/\*\*/g, '').replace(/\*/g, '');
  };

  return (
    <div className="apple-glass rounded-[2rem] h-full flex flex-col relative overflow-hidden border border-white/10 shadow-2xl">
      <div className="absolute top-0 w-full z-20 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#1c1c1e]/90 to-transparent backdrop-blur-[1px]">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Sora AI</span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-16 pb-4 space-y-6 no-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[85%] px-5 py-3.5 text-[15px] leading-relaxed font-medium shadow-sm backdrop-blur-sm ${
                msg.role === 'user'
                  ? 'bg-[#0A84FF] text-white rounded-[1.25rem] rounded-tr-sm'
                  : 'bg-[#2C2C2E]/80 text-zinc-100 rounded-[1.25rem] rounded-tl-sm border border-white/5'
              }`}
            >
              {cleanText(msg.text)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#2C2C2E]/80 border border-white/5 rounded-[1.25rem] rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>

      <div className="p-4 z-20 bg-gradient-to-t from-[#1c1c1e]/90 to-transparent">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            className="w-full bg-[#1C1C1E]/80 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:bg-[#2C2C2E] transition-all backdrop-blur-xl shadow-lg"
            placeholder="Ketik pesan..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0A84FF] hover:bg-[#0071e3] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-0 disabled:scale-75 shadow-lg shadow-blue-500/20 scale-button"
          >
            <ArrowUp className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiCompanion;