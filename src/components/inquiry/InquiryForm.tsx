import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import './InquiryForm.css';

const InquiryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Academic',
    description: '',
    priority: 'Normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save to D1 database would go here
    console.log('Submitting Inquiry:', formData);
    navigate('/dashboard/my-inquiries');
  };

  // Helper to handle all input changes cleanly and fix TypeScript errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="inquiry-form-container">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
        
        <div className="form-group">
          <label className="text-sm font-bold text-primary">Subject/Issue Title</label>
          <input 
            type="text" 
            name="subject"
            required 
            placeholder="e.g., Grade dispute for IT 302"
            className="w-full p-2 border rounded-lg mt-1"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="text-sm font-bold text-primary">Category</label>
            <select 
              name="category"
              className="w-full p-2 border rounded-lg mt-1"
              onChange={handleChange}
              defaultValue="Academic"
            >
              <option>Academic</option>
              <option>Technical</option>
              <option>Behavioral</option>
              <option>General</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm font-bold text-primary">Priority Level</label>
            <select 
              name="priority"
              className="w-full p-2 border rounded-lg mt-1"
              onChange={handleChange}
              defaultValue="Normal"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="text-sm font-bold text-primary">Detailed Description</label>
          <textarea 
            name="description"
            rows={5} 
            required
            placeholder="Please provide as much detail as possible..."
            className="w-full p-2 border rounded-lg mt-1"
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-opacity-90">
          <Send size={18} /> Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;