import { useState, useEffect } from 'react';
import { InquiryService, Inquiry } from '@/services/inquiry.service';

export const useInquiries = () => {
  const [tickets, setTickets] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Automatically fetch when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await InquiryService.getAll();
        setTickets(data);
      } catch (err) {
        setError('Failed to load tickets. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tickets, isLoading, error };
};