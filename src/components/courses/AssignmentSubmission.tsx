import { UploadCloud } from 'lucide-react';
import './AssignmentSubmission.css';

const AssignmentSubmission = () => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-2">Submit Assignment</h2>
      <p className="text-gray-500 mb-6">Upload your file or paste a link.</p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 hover:bg-gray-50 transition cursor-pointer">
        <UploadCloud size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="font-bold text-primary">Click to upload</p>
        <p className="text-xs text-gray-400">PDF, DOCX, ZIP up to 10MB</p>
      </div>

      <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition">
        Submit Assignment
      </button>
    </div>
  );
};

export default AssignmentSubmission;