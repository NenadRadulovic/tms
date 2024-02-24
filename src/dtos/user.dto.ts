import { Ticket, User } from '@prisma/client';

export interface UserRequest extends Partial<User> {
  email: string;
  password: string;
}

export interface UserResponse extends Partial<User> {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tickets?: Partial<Ticket>[];
}
