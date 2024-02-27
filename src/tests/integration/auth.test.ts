// test/sample.test.ts
import client from '@dbPrisma/client';
import request from 'supertest';
import { afterAll, describe, expect, it, vi } from 'vitest';
import app from '../../index';

vi.mock('../prisma/client');

afterAll(async () => {
  await client.$transaction([
    client.user.deleteMany(),
    client.ticket.deleteMany(),
  ]);
});

describe('Auth endpoint', async () => {
  it('Registers user', async () => {
    const userData = {
      email: 'testuser2@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: 'Admin',
    };
    const { status } = await request(app).post('/auth/register').send(userData);
    const newUser = await client.user.findFirst({
      where: { email: userData.email },
    });
    expect(status).toBe(201);
    expect(newUser).not.toBeNull();
    expect(newUser?.email).toEqual(userData.email);
    expect(newUser?.first_name).toEqual(userData.first_name);
    expect(newUser?.last_name).toEqual(userData.last_name);
  });
  it('Logs in user', async () => {
    const loginData = {
      email: 'testuser2@yopmail.com',
      password: 'test123!',
    };
    const {
      status,
      body: { token },
    } = await request(app).post('/auth/login').send(loginData);
    expect(status).toBe(200);
    expect(token).not.toBeNull();
  });
});
