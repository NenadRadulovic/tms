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
