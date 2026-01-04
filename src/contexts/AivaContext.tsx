import React, { createContext, useState, useContext } from 'react';
import { AiService } from '../services/ai.service'; // Ensure this matches your filename

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

export const AivaContext = createContext<AivaContextType | undefined>(undefined);

export const AivaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am Aiva. How can I help with your studies today?', timestamp: new Date() }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const askAiva = async (question: string) => {
    // 1. Optimistic UI Update (Show user message immediately)
    const userMsg: Message = { role: 'user', content: question, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      // FIX: AiService.askTutor expects a string, not an object.
      // We removed the 'context' object because the service definition doesn't support it yet.
      const response = await AiService.askTutor(question);

      // FIX: Ensure we handle the response format correctly
      // If response is just { answer: "..." }, use it.
      const answerText = response.answer || "I received your message but got no text back.";

      const aiMsg: Message = { role: 'assistant', content: answerText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to the Aiva server.", 
        timestamp: new Date() 
      }]);
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

// Custom Hook
export const useAiva = () => {
  const context = useContext(AivaContext);
  if (context === undefined) {
    throw new Error('useAiva must be used within an AivaProvider');
  }
  return context;
};