import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

const GradeComponentConfig = () => {
  const [components, setComponents] = useState([
    { id: 1, name: 'Quizzes', weight: 30 },
    { id: 2, name: 'Major Exams', weight: 40 },
    { id: 3, name: 'Projects', weight: 20 },
    { id: 4, name: 'Attendance', weight: 10 },
  ]);

  const totalWeight = components.reduce((acc, curr) => acc + curr.weight, 0);
  const isValid = totalWeight === 100;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-lg">
      <h3 className="font-bold text-primary mb-4">Grading System Configuration</h3>
      
      <div className="space-y-4 mb-6">
        {components.map((comp, idx) => (
          <div key={comp.id} className="flex items-center gap-4">
            <input 
              type="text" 
              value={comp.name}
              className="flex-1 p-2 border rounded-lg text-sm font-bold text-gray-700 bg-gray-50"
              readOnly // Hardcoded for demo
            />
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={comp.weight}
                className="w-16 p-2 border rounded-lg text-center font-bold"
                onChange={(e) => {
                  const newComps = [...components];
                  newComps[idx].weight = parseInt(e.target.value) || 0;
                  setComponents(newComps);
                }}
              />
              <span className="text-gray-400 font-bold">%</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-3 rounded-xl flex justify-between items-center mb-6 ${isValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
        <span className="text-xs font-bold uppercase">Total Weight</span>
        <span className="font-black text-xl">{totalWeight}%</span>
      </div>

      <button 
        disabled={!isValid}
        className="w-full py-3 bg-primary disabled:bg-gray-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
      >
        <Save size={18} /> Save Configuration
      </button>
    </div>
  );
};

export default GradeComponentConfig;