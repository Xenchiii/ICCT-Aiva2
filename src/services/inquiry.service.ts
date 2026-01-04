export interface Inquiry {
  id: string;
  subject: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  description: string;
  createdAt: string;
}

// SIMULATED DATABASE (Mock Data)
const MOCK_TICKETS: Inquiry[] = [
  { id: 'INQ-101', subject: 'Grade Dispute IT302', category: 'Academic', status: 'Open', description: 'Midterm grade missing.', createdAt: '2026-01-02' },
  { id: 'INQ-102', subject: 'Cannot Login', category: 'Technical', status: 'Resolved', description: 'Password reset failed.', createdAt: '2025-12-28' },
];

export const InquiryService = {
  // 1. Fetch All Tickets
  getAll: async (): Promise<Inquiry[]> => {
    // Simulate a 1-second network delay (Realism!)
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [...MOCK_TICKETS]; 
  },

  // 2. Create Ticket
  create: async (data: Partial<Inquiry>): Promise<Inquiry> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newTicket = { 
      ...data, 
      id: `INQ-${Math.floor(Math.random() * 1000)}`, 
      status: 'Open' as const,
      createdAt: new Date().toISOString()
    } as Inquiry;
    MOCK_TICKETS.push(newTicket); // Add to local mock DB
    return newTicket;
  },

  // 3. Update Ticket (NEW - needed for updateInquiryStatus)
  update: async (id: string, data: Partial<Inquiry>): Promise<Inquiry> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const ticketIndex = MOCK_TICKETS.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) {
      throw new Error(`Ticket with id ${id} not found`);
    }

    // Update the ticket in the mock database
    MOCK_TICKETS[ticketIndex] = {
      ...MOCK_TICKETS[ticketIndex],
      ...data
    };

    return MOCK_TICKETS[ticketIndex];
  },

  // 4. Get Single Ticket by ID (Bonus - useful for detail views)
  getById: async (id: string): Promise<Inquiry | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const ticket = MOCK_TICKETS.find(ticket => ticket.id === id);
    return ticket || null;
  },

  // 5. Delete Ticket (Bonus - for admin functionality)
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const ticketIndex = MOCK_TICKETS.findIndex(ticket => ticket.id === id);
    
    if (ticketIndex === -1) {
      return false;
    }

    MOCK_TICKETS.splice(ticketIndex, 1);
    return true;
  }
};