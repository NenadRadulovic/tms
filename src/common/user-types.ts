import { JwtPayload } from 'jsonwebtoken';

export type UserRole = 'Admin' | 'Worker';

export interface UserDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginDTO {
  email: string;
  password: string;
  accessToken: string;
}

export interface TokenData {
  id: number;
  role: UserRole;
  email: string;
}

export interface Token {
  token: JwtPayload | string | null;
  error: string | null;
}
