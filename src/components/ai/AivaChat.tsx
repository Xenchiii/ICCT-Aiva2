import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User } from 'lucide-react';
import './AivaChat.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AivaChat = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello Jame! I noticed you have a quiz in IT 302 coming up. Would you like to review 'React Hooks'?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 2. SIMULATE AI THINKING (Hardcoded Delay)
    setTimeout(() => {
      let aiResponseText = "I can help you with that! Here are some resources from your module.";
      
      // Simple Keyword Matching logic
      if (input.toLowerCase().includes('grade')) aiResponseText = "Your current predicted grade for IT 302 is 1.25 based on your recent quiz scores.";
      if (input.toLowerCase().includes('quiz')) aiResponseText = "I can generate a 10-question practice quiz for you. Ready to start?";
      if (input.toLowerCase().includes('hello')) aiResponseText = "Hi there! Ready to study?";

      const aiMsg: Message = { id: Date.now() + 1, text: aiResponseText, sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="aiva-chat-window animate-slide-up">
      <div className="chat-header">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-secondary rounded-full text-primary">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white">Aiva Assistant</h3>
            <p className="text-[10px] text-white/70 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white"><X size={20}/></button>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
            {msg.sender === 'ai' && <div className="avatar ai"><Bot size={14}/></div>}
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && <div className="avatar user"><User size={14}/></div>}
          </div>
        ))}
        {isTyping && (
          <div className="message-row ai-row">
            <div className="avatar ai"><Bot size={14}/></div>
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-footer">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your grades, quizzes..." 
        />
        <button type="submit" disabled={!input}><Send size={18}/></button>
      </form>
    </div>
  );
};

export default AivaChat;