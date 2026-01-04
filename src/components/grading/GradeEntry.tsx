import { useState } from 'react';
import { Save, Calculator, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import './GradeEntry.css'; // Uncomment if you actually have this file

const GradeEntry = () => {
  const navigate = useNavigate();
  
  // Mock Student List for IT 302
  const [students, setStudents] = useState([
    { id: '2023-01', name: 'Abad, Josh', quiz: 85, exam: 90, project: 92, final: 0, grade: 0 },
    { id: '2023-02', name: 'Bautista, Bea', quiz: 78, exam: 82, project: 85, final: 0, grade: 0 },
    { id: '2023-03', name: 'Cruz, Carl', quiz: 95, exam: 94, project: 98, final: 0, grade: 0 },
  ]);

  // Simple Auto-calculation Logic
  const calculateGrades = () => {
    const updated = students.map(s => {
      // Formula: 30% Quiz + 40% Exam + 30% Project
      const rawScore = (s.quiz * 0.3) + (s.exam * 0.4) + (s.project * 0.3);
      
      // Transmutation (Simplified)
      let transmuted = 5.0;
      if (rawScore >= 98) transmuted = 1.00;
      else if (rawScore >= 95) transmuted = 1.25;
      else if (rawScore >= 92) transmuted = 1.50;
      else if (rawScore >= 89) transmuted = 1.75;
      else if (rawScore >= 86) transmuted = 2.00;
      else if (rawScore >= 83) transmuted = 2.25;
      else if (rawScore >= 80) transmuted = 2.50;
      else if (rawScore >= 75) transmuted = 2.75;
      else if (rawScore >= 75) transmuted = 3.00;
      
      return { ...s, final: parseFloat(rawScore.toFixed(1)), grade: parseFloat(transmuted.toFixed(2)) };
    });
    setStudents(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary">Grading Sheet: IT 302</h1>
            <p className="text-xs text-gray-500">Web Development • 1st Sem 2025-2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={calculateGrades}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg text-sm hover:brightness-110"
          >
            <Calculator size={16} /> Auto-Compute
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg text-sm hover:bg-opacity-90">
            <Save size={16} /> Save Grades
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-4 py-4 w-24">Quizzes (30%)</th>
              <th className="px-4 py-4 w-24">Exams (40%)</th>
              <th className="px-4 py-4 w-24">Project (30%)</th>
              <th className="px-6 py-4 w-32 font-black text-primary">Final Grade</th>
              <th className="px-6 py-4 w-32 text-right">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* FIX: Removed 'idx' because it was unused */}
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3">
                  <input type="number" defaultValue={s.quiz} className="w-16 p-1 border rounded text-center bg-gray-50 focus:bg-white focus:border-primary outline-none" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" defaultValue={s.exam} className="w-16 p-1 border rounded text-center bg-gray-50 focus:bg-white focus:border-primary outline-none" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" defaultValue={s.project} className="w-16 p-1 border rounded text-center bg-gray-50 focus:bg-white focus:border-primary outline-none" />
                </td>
                <td className="px-6 py-3">
                  <span className={`font-black text-lg ${s.grade > 3.0 ? 'text-red-500' : 'text-primary'}`}>
                    {s.grade || '-.--'}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    s.grade === 0 ? 'bg-gray-100 text-gray-400' :
                    s.grade <= 3.0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {s.grade === 0 ? 'PENDING' : s.grade <= 3.0 ? 'PASSED' : 'FAILED'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeEntry;