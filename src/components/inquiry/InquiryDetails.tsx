import InquiryTimeline from './InquiryTimeline';
import ResponseInterface from './ResponseInterface';
import { ArrowLeft, User, Calendar } from 'lucide-react';

const InquiryDetails = ({ inquiry, onBack }: any) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition">
        <ArrowLeft size={16} /> Back to List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Content */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-black text-primary">{inquiry.subject}</h2>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {inquiry.status}
              </span>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-8">{inquiry.description}</p>
            
            <ResponseInterface />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-primary mb-4">Ticket Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Requested By</p>
                  <p className="text-sm font-medium">{inquiry.studentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Created On</p>
                  <p className="text-sm font-medium">Jan 02, 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-primary mb-6">Resolution Progress</h4>
            <InquiryTimeline status={inquiry.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetails;