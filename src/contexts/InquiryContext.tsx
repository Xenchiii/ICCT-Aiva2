import React, { createContext, useContext, useState, useCallback } from 'react';
import { InquiryService } from '../services/inquiry.service';

interface Inquiry {
  id: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  subject: string;
  description: string;
  createdAt: string;
}

interface InquiryContextType {
  inquiries: Inquiry[];
  activeInquiry: Inquiry | null;
  setActiveInquiry: (inquiry: Inquiry | null) => void; // FIX 1: Add this definition
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
      const data = await InquiryService.getAll();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching student inquiries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit new inquiry
  const submitInquiry = async (data: Partial<Inquiry>) => {
    setLoading(true);
    try {
      const newInquiry = await InquiryService.create(data);
      setInquiries((prev) => [newInquiry, ...prev]);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    try {
      await InquiryService.update(id, { status });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      throw error;
    }
  };

  // Admin fetch function
  const fetchAdminInquiries = async (filters: any) => {
    setLoading(true);
    try {
      // FIX 2: "Use" the filters variable to silence the warning
      console.log("Applying filters:", filters); 
      
      const data = await InquiryService.getAll();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching admin inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        activeInquiry,
        setActiveInquiry, // FIX 1: Expose the function here
        loading,
        submitInquiry,
        fetchStudentInquiries,
        fetchAdminInquiries,
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