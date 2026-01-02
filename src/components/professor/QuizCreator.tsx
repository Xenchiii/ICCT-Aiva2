import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const QuizCreator = () => {
  const [questions, setQuestions] = useState([{ id: 1, text: '', options: ['', '', '', ''], correct: 0 }]);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">Quiz Builder</h2>
        <button className="bg-primary text-secondary px-4 py-2 rounded-lg text-sm font-bold">Save Quiz</button>
      </div>

      {questions.map((q, qIndex) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
            <Trash2 size={18} />
          </button>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Question {qIndex + 1}</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-50" placeholder="Enter question text..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2">
                <input type="radio" name={`correct-${q.id}`} className="w-4 h-4 text-primary" />
                <input type="text" className="flex-1 p-2 border border-gray-300 rounded text-sm" placeholder={`Option ${oIndex + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={addQuestion} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-primary hover:text-primary transition flex items-center justify-center gap-2">
        <Plus size={20} /> Add New Question
      </button>
    </div>
  );
};

export default QuizCreator;