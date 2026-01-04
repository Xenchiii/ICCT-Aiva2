import { Check, X } from 'lucide-react';

const ATTENDANCE_DATA = [
  { id: '2023-01', name: 'Abad, Josh', timeIn: '8:45 AM', status: 'Present' },
  { id: '2023-02', name: 'Bautista, Bea', timeIn: '9:05 AM', status: 'Late' },
  { id: '2023-03', name: 'Cruz, Carl', timeIn: '--:--', status: 'Absent' },
];

const AttendanceTracker = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-800">Live Attendance Sheet</h3>
        <p className="text-xs text-gray-500">Event: ICCT Tech Summit 2026</p>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4">Student</th>
            <th className="px-6 py-4">Time In</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ATTENDANCE_DATA.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 font-medium">{row.name}</td>
              <td className="px-6 py-4 text-gray-500">{row.timeIn}</td>
              <td className="px-6 py-4">
                {row.status === 'Absent' ? (
                  <span className="flex items-center gap-1 text-red-500 font-bold text-xs"><X size={14}/> ABSENT</span>
                ) : (
                  <span className="flex items-center gap-1 text-green-600 font-bold text-xs"><Check size={14}/> {row.status.toUpperCase()}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTracker;