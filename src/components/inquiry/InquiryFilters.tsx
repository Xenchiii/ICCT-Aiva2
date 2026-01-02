import React from 'react';
import { Filter, Search } from 'lucide-react';

const InquiryFilters = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2 text-primary font-bold">
        <Filter size={18} />
        <span>Filter Tickets</span>
      </div>

      <div className="space-y-4">
        {/* Search Bar */}
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400">Keyword</label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm" />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400">Status</label>
          <div className="space-y-2 mt-2">
            {['Open', 'In Progress', 'Resolved', 'Closed'].map(status => (
              <label key={status} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400">Category</label>
          <select className="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
            <option>All Categories</option>
            <option>Academic</option>
            <option>Technical</option>
            <option>Behavioral</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InquiryFilters;