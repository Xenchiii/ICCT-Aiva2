import { useState } from 'react';
import { Plus, RefreshCcw, Trophy } from 'lucide-react';

const GWACalculator = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, units: 3, grade: 1.25 },
    { id: 2, units: 3, grade: 1.50 },
    { id: 3, units: 2, grade: 1.75 },
  ]);

  const calculateGWA = () => {
    const totalUnits = subjects.reduce((acc, curr) => acc + curr.units, 0);
    const weightedSum = subjects.reduce((acc, curr) => acc + (curr.units * curr.grade), 0);
    return (weightedSum / totalUnits).toFixed(4);
  };

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), units: 3, grade: 1.00 }]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-primary">GWA Calculator</h2>
        <p className="text-gray-500 text-sm">Predict your semester standing</p>
      </div>

      <div className="bg-primary/5 p-4 rounded-xl text-center mb-6">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Calculated GWA</p>
        <p className="text-4xl font-black text-primary mt-2">{calculateGWA()}</p>
        <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
          <Trophy size={12} /> Dean's Lister Qualified
        </div>
      </div>

      <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
        {subjects.map((sub, index) => (
          <div key={sub.id} className="flex gap-3 items-center">
            <span className="text-xs font-bold text-gray-400 w-6">#{index + 1}</span>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 block mb-1">UNITS</label>
              <input 
                type="number" 
                value={sub.units}
                className="w-full p-2 bg-gray-50 border rounded-lg text-sm font-bold text-center"
                onChange={(e) => {
                  const newSubs = [...subjects];
                  newSubs[index].units = parseFloat(e.target.value) || 0;
                  setSubjects(newSubs);
                }}
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 block mb-1">GRADE</label>
              <select 
                value={sub.grade}
                className="w-full p-2 bg-gray-50 border rounded-lg text-sm font-bold text-center appearance-none"
                onChange={(e) => {
                  const newSubs = [...subjects];
                  newSubs[index].grade = parseFloat(e.target.value);
                  setSubjects(newSubs);
                }}
              >
                {[1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 5.00].map(g => (
                  <option key={g} value={g}>{g.toFixed(2)}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={addSubject} className="flex-1 py-3 border-2 border-dashed border-gray-200 rounded-xl font-bold text-gray-500 hover:border-primary hover:text-primary transition flex items-center justify-center gap-2">
          <Plus size={16} /> Add Subject
        </button>
        <button onClick={() => setSubjects([])} className="p-3 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition">
          <RefreshCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default GWACalculator;