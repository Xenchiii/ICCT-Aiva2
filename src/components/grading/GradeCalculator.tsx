import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const GradeCalculator = () => {
  const [rawScore, setRawScore] = useState(0);

  const getTransmuted = (score: number) => {
    if (score >= 98) return '1.00';
    if (score >= 95) return '1.25';
    if (score >= 92) return '1.50';
    if (score >= 89) return '1.75';
    if (score >= 86) return '2.00';
    if (score >= 83) return '2.25';
    if (score >= 80) return '2.50';
    if (score >= 75) return '3.00';
    return '5.00';
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Calculator size={20} />
        <h3 className="font-bold">Quick Grade Converter</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Raw Score (0-100)</label>
          <input 
            type="range" 
            min="0" max="100" 
            value={rawScore}
            onChange={(e) => setRawScore(parseInt(e.target.value))}
            className="w-full accent-primary mb-2"
          />
          <input 
            type="number" 
            value={rawScore}
            onChange={(e) => setRawScore(parseInt(e.target.value))}
            className="w-full p-3 border rounded-xl text-center font-bold text-xl"
          />
        </div>

        <div className="text-center bg-gray-50 rounded-xl flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Transmuted Grade</p>
          <p className={`text-4xl font-black ${getTransmuted(rawScore) === '5.00' ? 'text-red-500' : 'text-primary'}`}>
            {getTransmuted(rawScore)}
          </p>
          <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">ICCT Standard</p>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;