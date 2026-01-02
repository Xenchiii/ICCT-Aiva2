import { useState } from 'react';
import { AiService } from '../services/ai.service';

export const useAiva = () => {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (input: string) => {
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setIsTyping(true);
    
    try {
      const response = await AiService.askTutor(input) as { answer: string };
      setMessages(prev => [...prev, { role: 'assistant', text: response.answer }]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
};