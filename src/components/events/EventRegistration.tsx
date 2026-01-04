import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const EventRegistration = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API Call
    setTimeout(() => {
        navigate('/events'); 
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Registration Successful!</h2>
        <p className="text-gray-500 mt-2">Check your email for your digital ticket.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
          <input type="text" value="Student User" disabled className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Student ID</label>
          <input type="text" value="2023-0001" disabled className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Dietary Restrictions (Optional)</label>
          <input type="text" placeholder="e.g. Halal, Vegetarian" className="w-full p-3 rounded-lg border border-gray-200 focus:border-primary outline-none" />
        </div>
        
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-blue-900 transition">
          Confirm & Get Ticket
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;