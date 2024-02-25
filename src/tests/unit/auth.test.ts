// test/sample.test.ts
import { Role } from '@prisma/client';
import { UserRequest } from 'src/dtos/user.dto';
import { describe, expect, it } from 'vitest';
import { generateJWT, verifyToken } from '../../helpers/generate-jwt-token';

describe('JWT Token Logic unit tests', async () => {
  it('Creates JWT Token', async () => {
    const userData: UserRequest = {
      id: 321,
      email: 'testuser2@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Admin,
    };
    const token = generateJWT(userData);
    expect(token).not.toBeNull();
  });
  it('Decodes JWT Token OK', async () => {
    const userData: UserRequest = {
      id: 123,
      email: 'loginUser@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Admin,
    };
    const jwtToken = generateJWT(userData);
    const { token, error } = verifyToken(jwtToken);
    expect(error).toBeNull();

    const tokenData = token as UserRequest;
    Object.keys(userData).forEach((key) =>
      expect(userData[key]).toBe(tokenData[key]),
    );
    expect(Object.keys(tokenData)).contains('iat');
  });
});
