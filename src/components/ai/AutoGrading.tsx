import { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

const AutoGrading = () => {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle');

  const startGrading = () => {
    setStatus('analyzing');
    // Simulate AI Analysis Delay
    setTimeout(() => {
      setStatus('done');
    }, 2500);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-primary flex items-center gap-2">
          <Sparkles size={18} className="text-secondary" /> 
          AI Auto-Grader
        </h3>
        <span className="text-[10px] uppercase font-bold text-gray-400">Model: NLP-v4</span>
      </div>

      {status === 'idle' && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <FileText className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-sm font-bold text-gray-600">assignment_submission.pdf</p>
          <button 
            onClick={startGrading}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90"
          >
            Run AI Assessment
          </button>
        </div>
      )}

      {status === 'analyzing' && (
        <div className="text-center py-10 space-y-4">
          <Loader2 className="animate-spin mx-auto text-primary" size={40} />
          <p className="text-sm font-bold animate-pulse">Analyzing syntax and semantics...</p>
        </div>
      )}

      {status === 'done' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
            <div>
              <p className="text-xs uppercase font-bold text-green-700">Predicted Score</p>
              <p className="text-3xl font-black text-green-700">92/100</p>
            </div>
            <CheckCircle size={40} className="text-green-500" />
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm">Feedback Generated:</h4>
            <div className="p-3 bg-gray-50 rounded-lg text-xs flex gap-2">
              <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
              <p>Strong argument structure in paragraph 2.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg text-xs flex gap-2">
              <AlertTriangle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
              <p>Citation format on page 3 varies. Suggested format: APA 7th Ed.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoGrading;