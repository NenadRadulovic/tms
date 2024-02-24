// test/sample.test.ts
import client from '@dbPrisma/client';
import { UserRequest } from '@dtos/user.dto';
import { generateJWT } from '@helpers/generate-jwt-token';
import { Role } from '@prisma/client';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import app from '../../index';

vi.mock('../prisma/client');

afterAll(async () => {
  await client.$transaction([
    client.ticket.deleteMany(),
    client.user.deleteMany(),
  ]);
});

let worker: UserRequest;

beforeAll(async () => {
  worker = await client.user.create({
    data: {
      email: 'workertest@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      updated_at: new Date(),
      role: Role.Worker,
    },
  });
});

describe('Ticket Endpoint', async () => {
  it('Missing auth token return 403', async () => {
    const ticketData = {
      title: 'Test Title',
      description: 'My tests are working',
    };

    const { status } = await request(app).post('/tickets').send(ticketData);
    expect(status).toBe(401);
    // expect(error).toBe('Invalid Token');
  });
  it('Creates ticket successfully', async () => {
    const ticketData = {
      title: 'Test Title',
      description: 'My tests are working',
    };

    const workerToken = generateJWT(worker);

    const { status } = await request(app)
      .post('/tickets')
      .set('Authorization', `bearer ${workerToken}`)
      .send(ticketData);
    expect(status).toBe(200);
  });
});
