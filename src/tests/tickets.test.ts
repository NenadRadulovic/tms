// test/sample.test.ts
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../index';
import client from '@dbPrisma/client';
import { generateJWT } from '../helpers/generate-jwt-token';
import { User } from '@prisma/client';

vi.mock('../prisma/client');

afterAll(async () => {
  await client.$transaction([
    client.ticket.deleteMany(),
    client.user.deleteMany(),
  ]);
});

let admin: User;
let worker: User;

beforeAll(async () => {
  admin = await client.user.create({
    data: {
      email: 'admintest@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      updated_at: new Date(),
      role: 'Admin',
    },
  });
  worker = await client.user.create({
    data: {
      email: 'workertest@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      updated_at: new Date(),
      role: 'Worker',
    },
  });
});

describe('Ticket Endpoint', async () => {
  it('Missing auth token return 403', async () => {
    const ticketData = {
      title: 'Test Title',
      description: 'My tests are working',
    };

    const {
      status,
      body: { error },
    } = await request(app).post('/tickets').send(ticketData);
    expect(status).toBe(403);
    expect(error).toBe('Invalid token');
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
  it('Updates ticket successfuly', async () => {
    const workerToken = generateJWT(worker);
    const mockTicket = await client.ticket.create({
      data: {
        title: 'Test Ticket V2',
        description: 'Test description',
        status: 'Open',
        user_id: worker.id,
        updated_at: new Date(),
      },
    });
    const { status, body } = await request(app)
      .put(`/tickets/${mockTicket.id}`)
      .set('Authorization', `bearer ${workerToken}`)
      .send({
        status: 'Closed',
      });
    expect(status).toBe(200);
    expect(body.data.status);
  });
});
