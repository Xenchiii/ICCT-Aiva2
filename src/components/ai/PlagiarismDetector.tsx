import { useState } from 'react';
import { Search, FileWarning, Check } from 'lucide-react';

const PlagiarismDetector = () => {
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setSimilarity(12); // Hardcoded 12% match
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-primary">Plagiarism Check</h3>
        </div>
        {similarity !== null && (
          <span className={`px-2 py-1 rounded font-bold text-xs flex items-center gap-1 ${
            similarity > 15 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}>
            {similarity > 15 ? <FileWarning className="w-3 h-3" /> : <Check className="w-3 h-3" />}
            {similarity}% Match
          </span>
        )}
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        {checking ? (
          <div className="h-full bg-blue-500 animate-progress w-full origin-left"></div>
        ) : (
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${similarity || 0}%` }}></div>
        )}
      </div>
      
      <button 
        onClick={handleCheck}
        disabled={checking}
        className="w-full py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Search className="w-4 h-4" />
        {checking ? 'Scanning Databases...' : 'Scan for Originality'}
      </button>
      
      {similarity !== null && (
        <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
          <p className="font-bold mb-1">Sources Found:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Wikipedia (en.wikipedia.org) - <span className="text-red-500">2 Matches</span></li>
            <li>Course Hero - <span className="text-red-500">1 Match</span></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlagiarismDetector;