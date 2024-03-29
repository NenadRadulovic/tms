import { Ticket, User } from '@prisma/client';

export interface UserRequest extends Partial<User> {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  [key: string]: unknown;
}

export interface UserResponse extends Omit<Partial<User>, 'password'> {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  tickets?: Partial<Ticket>[];
  [key: string]: unknown;
}
