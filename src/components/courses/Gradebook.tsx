import './Gradebook.css';

const GRADES = [
  { item: 'Quiz 1: HTML', score: 28, total: 30, weight: '10%' },
  { item: 'Quiz 2: CSS', score: 25, total: 30, weight: '10%' },
  { item: 'Midterm Project', score: 95, total: 100, weight: '40%' },
];

const Gradebook = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
          <tr>
            <th className="px-6 py-4">Item</th>
            <th className="px-6 py-4">Weight</th>
            <th className="px-6 py-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {GRADES.map((g, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">{g.item}</td>
              <td className="px-6 py-4 text-gray-500">{g.weight}</td>
              <td className="px-6 py-4 text-right font-bold text-primary">
                {g.score} / {g.total}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-black">
            <td className="px-6 py-4 text-gray-800">Total Grade</td>
            <td></td>
            <td className="px-6 py-4 text-right text-lg text-primary">92.5%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Gradebook;