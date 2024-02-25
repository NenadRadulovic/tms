// test/sample.test.ts
import {
  AuthenticationError,
  AuthorizationError,
} from '@appCommon/error.common';
import client from '@dbPrisma/client';
import { generateJWT } from '@helpers/generate-jwt-token';
import { Role, User } from '@prisma/client';
import { createRequest, createResponse } from 'node-mocks-http';
import { isAdmin } from 'src/middlewares/guard';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('../prisma/client');

afterAll(async () => {
  await client.$transaction([
    client.ticket.deleteMany(),
    client.user.deleteMany(),
  ]);
});

let worker: User;
let admin: User;

beforeAll(async () => {
  worker = await client.user.create({
    data: {
      email: 'workertest@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Worker,
    },
  });
  admin = await client.user.create({
    data: {
      email: 'admin@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Admin,
    },
  });
});

describe('Middleware Integration', async () => {
  it('isAdmin when user is admin OK', async () => {
    const adminToken = generateJWT(admin);
    const req = createRequest({
      headers: {
        Authorization: `bearer: ${adminToken}`,
      },
    });
    const res = createResponse();
    const next = vi.fn();
    isAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('isAdmin when user is not admin NOT OK', async () => {
    const workerToken = generateJWT(worker);
    const req = createRequest({
      headers: {
        Authorization: `bearer: ${workerToken}`,
      },
    });
    const res = createResponse();
    const next = vi.fn();
    isAdmin(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AuthorizationError('You are not authorized'),
    );
  });
  it('isAdmin when not token provided NOT OK', async () => {
    const req = createRequest();
    const res = createResponse();
    const next = vi.fn();
    isAdmin(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Invalid token'));
  });
});
