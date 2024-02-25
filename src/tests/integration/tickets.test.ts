// test/sample.test.ts
import client from '@dbPrisma/client';
import { generateJWT } from '@helpers/generate-jwt-token';
import { Role, User } from '@prisma/client';
import ticketService from '@services/ticket.service';
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
  it('Assigns Ticket To admin', async () => {
    const adminToken = generateJWT(admin);
    const ticketData = {
      title: 'Test Title',
      description: 'My tests are working',
    };
    const ticket = await ticketService.createTicket(ticketData, worker.id);

    const { status, body } = await request(app)
      .post('/assign_ticket')
      .set('Authorization', `bearer ${adminToken}`)
      .send({
        ticket_id: ticket.id,
      });
    const { data } = body;
    expect(status).toBe(200);
    expect(data.adminId).toBe(admin.id);
    expect(data.ticketId).toBe(ticket.id);
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
