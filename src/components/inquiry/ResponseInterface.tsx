import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle, Lock } from 'lucide-react';

const ResponseInterface = () => {
  const [response, setResponse] = useState('');

  const handleSendResponse = () => {
    // Logic to save the response to the D1 Database
    console.log("Response Sent:", response);
    setResponse('');
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <MessageCircle size={18} />
        </div>
        <h3 className="font-bold text-primary">Official Staff Response</h3>
      </div>

      <textarea 
        className="w-full p-4 border-2 border-white rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm shadow-sm"
        rows={4}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Provide a resolution or request more information from the student..."
      ></textarea>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleSendResponse}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-secondary px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition"
          >
            <Send size={16} /> Send Response
          </button>
          
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition">
            <CheckCircle size={16} /> Mark as Resolved
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <Lock size={14} />
          <span className="text-[10px] font-medium uppercase">Secured via Aiva Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default ResponseInterface;