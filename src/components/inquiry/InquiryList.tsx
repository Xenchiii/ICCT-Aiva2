import React from 'react';
import InquiryCard from './InquiryCard';
import { useInquiries } from '@/hooks/useInquiries'; // Import the hook
import { Loader2, Inbox } from 'lucide-react';

const InquiryList = () => {
  // Use the hook instead of hardcoded arrays!
  const { tickets, isLoading, error } = useInquiries();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p className="text-sm font-bold">Loading your tickets...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
        <p className="font-bold">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // 3. Empty State
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Inbox className="mx-auto mb-2 opacity-50" size={48} />
        <p>No inquiries found.</p>
      </div>
    );
  }

  // 4. Real Data Render
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tickets.map((ticket) => (
        <InquiryCard key={ticket.id} inquiry={ticket} />
      ))}
    </div>
  );
};

export default InquiryList;