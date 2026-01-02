import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download } from 'lucide-react';

const BulkImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'preview' | 'done'>('idle');
  
  // Hardcoded "Parsed" Data (Simulating what was inside the Excel file)
  const parsedStudents = [
    { id: '2023-0051', name: 'Santos, Mark', program: 'BSIT', year: 3 },
    { id: '2023-0052', name: 'Dizon, Sarah', program: 'BSCS', year: 3 },
    { id: '2023-0053', name: 'Reyes, John', program: 'BSIT', year: 3 },
    // In a real app, this list would be 40+ items long
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('parsing');
      
      // Simulate "Reading" the Excel file
      setTimeout(() => {
        setStatus('preview');
      }, 1500);
    }
  };

  const handleConfirm = () => {
    setStatus('done');
    // Here you would normally send the data to the API
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-primary flex items-center gap-2">
            <FileSpreadsheet className="text-green-600" size={20} /> 
            Bulk Student Import
          </h3>
          <p className="text-xs text-gray-500">Upload your class roster (CSV or Excel) to enroll students instantly.</p>
        </div>
        <button className="text-xs flex items-center gap-1 text-blue-600 font-bold border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-50">
          <Download size={14} /> Download Template
        </button>
      </div>

      {/* 1. Upload Zone */}
      {status === 'idle' && (
        <label className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition group">
          <div className="p-4 bg-gray-100 rounded-full group-hover:scale-110 transition mb-3">
            <Upload size={24} className="text-gray-400" />
          </div>
          <p className="font-bold text-gray-600">Click to Upload Class Roster</p>
          <p className="text-xs text-gray-400 mt-1">Supports .xlsx, .csv (Max 5MB)</p>
          <input type="file" className="hidden" accept=".csv, .xlsx" onChange={handleFileChange} />
        </label>
      )}

      {/* 2. Loading State */}
      {status === 'parsing' && (
        <div className="py-12 text-center space-y-3">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-gray-600">Reading Excel File...</p>
          <p className="text-xs text-gray-400">Validating student IDs and programs</p>
        </div>
      )}

      {/* 3. Preview State */}
      {status === 'preview' && (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
            <CheckCircle size={16} />
            <span className="font-bold">Success! Found 42 students in "{file?.name}"</span>
          </div>

          <div className="max-h-48 overflow-y-auto border rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-xs font-bold text-gray-500">Student ID</th>
                  <th className="px-4 py-2 text-xs font-bold text-gray-500">Name</th>
                  <th className="px-4 py-2 text-xs font-bold text-gray-500">Program</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {parsedStudents.map((s, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2">{s.program}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-xs text-gray-400 italic">
                    ...and 39 others
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setStatus('idle')}
              className="flex-1 py-2 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 py-2 bg-primary text-white rounded-lg font-bold hover:bg-opacity-90"
            >
              Import 42 Students
            </button>
          </div>
        </div>
      )}

      {/* 4. Success State */}
      {status === 'done' && (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-primary">Import Complete!</h3>
          <p className="text-gray-500 mb-6">42 students have been added to your IT 302 class roster.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-sm font-bold text-primary underline"
          >
            Upload Another File
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkImport;