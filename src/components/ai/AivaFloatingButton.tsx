import { useState } from 'react'; // FIX: Removed 'React' from here
import { Sparkles, X } from 'lucide-react';
import AivaChat from './AivaChat';

const AivaFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <AivaChat onClose={() => setIsOpen(false)} />}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 z-50 ${
          isOpen ? 'bg-gray-200 text-gray-600 rotate-90' : 'bg-secondary text-primary'
        }`}
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} fill="currentColor" />}
      </button>
    </>
  );
};

export default AivaFloatingButton;