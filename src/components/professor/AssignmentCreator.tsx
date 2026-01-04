import { Upload } from 'lucide-react';

const AssignmentCreator = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-primary mb-6">Create New Assignment</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Final Research Paper" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>CS101 - Intro to Computing</option>
              <option>IT201 - Web Dev</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="datetime-local" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          <textarea rows={4} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter detailed instructions here..."></textarea>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload resource files (PDF, DOCX)</p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90">
            Publish Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentCreator;