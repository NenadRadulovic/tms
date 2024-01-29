type TicketStatus = 'Open' | 'Closed' | 'On Hold' | 'Solved';

export interface TicketDTO {
  id?: number;
  title: string;
  description: string;
  status?: TicketStatus;
  resolved_message?: string;
  created_at?: number;
  updated_at?: number;
  assignedAdmin?: number;
}
