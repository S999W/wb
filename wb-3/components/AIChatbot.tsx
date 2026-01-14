import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi, I'm the digital twin. Ask me anything about my creative process, writing, or music." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: userText } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
        // Format history for the API service
        const historyForApi = newMessages.slice(0, -1).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const responseText = await sendChatMessage(userText, historyForApi);

        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Sorry, I had trouble thinking about that." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-neutral-800 text-[#e9dfda] rotate-90' : 'bg-[#e9dfda] text-[#1c1b1a]'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3 bg-neutral-900 rounded-t-2xl">
          <div>
            <h3 className="font-bold text-[#e9dfda] text-sm">Digital Twin</h3>
            <p className="text-xs text-neutral-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                Gemini 3 Pro Active
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#e9dfda] text-[#1c1b1a] rounded-br-none'
                    : 'bg-neutral-800 text-neutral-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
             <div className="flex justify-start">
                 <div className="bg-neutral-800 text-neutral-400 p-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Deep Thinking Mode...</span>
                 </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 rounded-b-2xl">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 bg-[#1c1b1a] border border-neutral-700 text-[#e9dfda] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-purple-500 pr-10"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-neutral-800 rounded-full text-[#e9dfda] hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-[10px] text-center text-neutral-600 mt-2">
              Powered by Google Gemini 3 Pro Preview
          </p>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;