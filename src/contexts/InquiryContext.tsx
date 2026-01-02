import React, { createContext, useContext, useState, useCallback } from 'react';
import { InquiryService } from '../services/inquiry.service';

interface Inquiry {
  id: string;
  category: 'Academic' | 'Technical' | 'Administrative' | 'Behavioral' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  subject: string;
  message: string;
  attachments?: string[];
  createdAt: string;
}

interface InquiryContextType {
  inquiries: Inquiry[];
  activeInquiry: Inquiry | null;
  loading: boolean;
  submitInquiry: (data: Partial<Inquiry>) => Promise<void>;
  fetchStudentInquiries: () => Promise<void>;
  fetchAdminInquiries: (filters: any) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => Promise<void>;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch inquiries for the logged-in student
  const fetchStudentInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await InquiryService.getStudentTickets();
      setInquiries(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit new inquiry with AI pre-submission logic (handled in service/Aiva)
  const submitInquiry = async (data: Partial<Inquiry>) => {
    setLoading(true);
    try {
      const newInquiry = await InquiryService.submitTicket(data);
      setInquiries((prev) => [newInquiry, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    await InquiryService.updateStatus(id, status);
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        activeInquiry,
        loading,
        submitInquiry,
        fetchStudentInquiries,
        fetchAdminInquiries: async () => {}, // Admin-side implementation
        updateInquiryStatus,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiryContext = () => {
  const context = useContext(InquiryContext);
  if (!context) throw new Error('useInquiryContext must be used within an InquiryProvider');
  return context;
};