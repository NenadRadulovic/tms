// test/sample.test.ts
import client from '@dbPrisma/client';
import { faker } from '@faker-js/faker';
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
      email: faker.internet.email(),
      password: faker.internet.password({ length: 20 }),
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Worker,
    },
  });
  admin = await client.user.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 20 }),
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Admin,
    },
  });
  await client.ticket.create({
    data: {
      title: faker.airline.airplane().name,
      description: faker.lorem.lines(2),
      user_id: worker.id,
      assigned_admin_id: admin.id,
    },
  });
  await client.ticket.create({
    data: {
      title: faker.airline.airplane().name,
      description: faker.lorem.lines(2),
      user_id: worker.id,
      assigned_admin_id: admin.id,
    },
  });
  await client.ticket.create({
    data: {
      title: faker.airline.airplane().name,
      description: faker.lorem.lines(2),
      user_id: worker.id,
      assigned_admin_id: admin.id,
    },
  });
  await client.ticket.create({
    data: {
      title: faker.airline.airplane().name,
      description: faker.lorem.lines(2),
      user_id: worker.id,
      assigned_admin_id: admin.id,
    },
  });
});

describe('Ticket Endpoint', async () => {
  it('Missing auth token return 403 NOT OK', async () => {
    const ticketData = {
      title: 'Test Title',
      description: 'My tests are working',
    };

    const { status } = await request(app).post('/tickets').send(ticketData);
    expect(status).toBe(401);
    // expect(error).toBe('Invalid Token');
  });
  it('Assigns Ticket To admin OK', async () => {
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
  it('Creates ticket successfully OK', async () => {
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
  it('Gets tickets successfully OK', async () => {
    const workerToken = generateJWT(worker);

    const {
      status,
      body: { data },
    } = await request(app)
      .get('/tickets')
      .set('Authorization', `bearer ${workerToken}`);
    expect(status).toBe(200);
    expect(data.length).not.toBe(0);
  });
  it('Gets tickets created_at filters OK', async () => {
    const workerToken = generateJWT(worker);

    const {
      status,
      body: { data },
    } = await request(app)
      .get('/tickets?created_at=asc')
      .set('Authorization', `bearer ${workerToken}`);
    expect(status).toBe(200);
    expect(data.length).not.toBe(0);
  });
  it('Gets tickets status filter OK', async () => {
    const closedTicket = await ticketService.createTicket(
      {
        description: 'test closed',
        title: 'Test closed',
      },
      worker.id,
    );
    //update some tickets to closed status
    await ticketService.updateTicket(closedTicket.id, {
      status: 'Closed',
      description: closedTicket.description,
      title: closedTicket.status,
    });
    const workerToken = generateJWT(worker);
    const {
      status,
      body: { data },
    } = await request(app)
      .get('/tickets?created_at=asc')
      .set('Authorization', `bearer ${workerToken}`);
    expect(status).toBe(200);
    expect(data.length).not.toBe(0);
  });
});
