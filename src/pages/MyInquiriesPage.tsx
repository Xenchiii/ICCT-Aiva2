import { useInquiryContext } from '@/contexts/InquiryContext';
import { formatRelativeTime } from '@/utils/dateFormatter';

const MyInquiriesPage = () => {
  const { inquiries } = useInquiryContext();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-primary">My Support Tickets</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {inquiries.map((inq) => (
          <div key={inq.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <p className="text-xs font-mono text-gray-400">#{inq.id}</p>
              <h4 className="font-bold text-gray-800">{inq.subject}</h4>
              <p className="text-xs text-gray-500">{formatRelativeTime(inq.createdAt)}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              inq.status === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            }`}>
              {inq.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInquiriesPage;