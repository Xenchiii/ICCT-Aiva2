import { UploadCloud } from 'lucide-react';
import './FileUpload.css';

const FileUpload = () => {
  return (
    <div className="file-upload-zone">
      <UploadCloud size={32} className="mx-auto text-gray-400 mb-2" />
      <p className="font-bold text-gray-700">Click to upload or drag and drop</p>
      <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
    </div>
  );
};

export default FileUpload;