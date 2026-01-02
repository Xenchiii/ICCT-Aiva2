import React from 'react'
export default function InquiryForm(){return <div>Inquiry Form</div>}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, AlertCircle } from 'lucide-react';
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

  return (
    <div className="inquiry-form-container">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
        <div className="form-group">
          <label className="text-sm font-bold text-primary">Subject/Issue Title</label>
          <input 
            type="text" 
            required 
            placeholder="e.g., Grade dispute for IT 302"
            className="w-full p-2 border rounded-lg mt-1"
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="text-sm font-bold text-primary">Category</label>
            <select 
              className="w-full p-2 border rounded-lg mt-1"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
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
              className="w-full p-2 border rounded-lg mt-1"
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
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
            rows={5} 
            required
            placeholder="Please provide as much detail as possible..."
            className="w-full p-2 border rounded-lg mt-1"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
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