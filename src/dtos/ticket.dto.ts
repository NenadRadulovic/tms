import { Ticket, User } from '@prisma/client';

export interface TicketRequest extends Partial<Ticket> {
  description: string;
  title: string;
}

export interface TicketResponse extends Partial<Ticket> {
  id: number;
  title: string;
  description: string;
  user: Partial<User>;
}
