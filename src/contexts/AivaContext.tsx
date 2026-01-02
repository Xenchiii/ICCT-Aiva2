'use client';

import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation'; // Detect current page
import { AiService } from '../services/ai.service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AivaContextType {
  messages: Message[];
  isThinking: boolean;
  askAiva: (question: string) => Promise<void>;
  isOpen: boolean;
  toggleChat: () => void;
}

const AivaContext = createContext<AivaContextType | undefined>(undefined);

export const AivaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am Aiva. How can I help with your studies today?', timestamp: new Date() }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const pathname = usePathname(); // e.g., "/courses/CS101"

  const askAiva = async (question: string) => {
    // Optimistic Update
    const userMsg: Message = { role: 'user', content: question, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      // Send the current page context (pathname) to the AI
      const response = await AiService.askTutor({
        question,
        context: { page: pathname } 
      });

      const aiMsg: Message = { role: 'assistant', content: response.answer, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the server.", timestamp: new Date() }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AivaContext.Provider value={{ messages, isThinking, askAiva, isOpen, toggleChat: () => setIsOpen(!isOpen) }}>
      {children}
    </AivaContext.Provider>
  );
};