import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenData extends Partial<User> {
  email: string;
}

export interface Token {
  token: JwtPayload | string | null;
  error: string | null;
}
