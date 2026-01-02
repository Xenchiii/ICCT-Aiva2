import React, { useState } from 'react';
import InquiryList from './InquiryList';
import InquiryFilters from './InquiryFilters';
import InquiryAnalytics from './InquiryAnalytics';
import { LayoutDashboard, ListFilter, BarChart3 } from 'lucide-react';

const InquiryDashboard = () => {
  const [view, setView] = useState<'list' | 'analytics'>('list');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-primary">Inquiry Management</h1>
          <p className="text-gray-500 text-sm">Monitor and resolve student concerns.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${view === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
          >
            <ListFilter size={16} /> Tickets
          </button>
          <button 
            onClick={() => setView('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${view === 'analytics' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
          >
            <BarChart3 size={16} /> Analytics
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <InquiryFilters />
          </div>
          <div className="lg:col-span-3">
            <InquiryList />
          </div>
        </div>
      ) : (
        <InquiryAnalytics />
      )}
    </div>
  );
};

export default InquiryDashboard;