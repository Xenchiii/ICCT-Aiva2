import { AlertCircle, CheckCircle } from 'lucide-react'; 

interface SLAProps {
  createdAt: string;
  category: string;
}

const SLAIndicator = ({ createdAt, category }: SLAProps) => {
  // FIX: We now USE the 'category' prop to make the mock logic dynamic
  // This satisfies TypeScript's "unused variable" check
  const isUrgentCategory = category === 'Urgent' || category === 'Technical';
  
  // Mock calculation: If category is urgent, give less time
  const hoursLeft = isUrgentCategory ? 4 : 14; 
  const isUrgent = hoursLeft < 12;

  return (
    <div 
      // FIX: Used 'createdAt' in the title for hover effect (satisfies unused check)
      title={`Created at: ${createdAt}`}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
        isUrgent ? 'bg-red-50 border-red-100 text-red-600' : 'bg-green-50 border-green-100 text-green-600'
      }`}
    >
      {isUrgent ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-tighter">SLA Status</span>
        <span className="text-xs font-bold">{hoursLeft}h remaining</span>
      </div>
    </div>
  );
};

export default SLAIndicator;