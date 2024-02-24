import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import request from 'supertest';
import app from '../../index';
import client from '@dbPrisma/client';
import { generateJWT } from '../../helpers/generate-jwt-token';
import { Ticket, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import ticketService from '@services/ticket.service';
import { beforeEach } from 'node:test';

vi.mock('../../prisma/client');

afterAll(async () => {
  await client.$transaction([
    client.ticket.deleteMany(),
    client.user.deleteMany(),
  ]);
});

afterEach(async () => {
  await client.$transaction([client.ticket.deleteMany()]);
});

let worker: User;

beforeAll(async () => {
  worker = await client.user.create({
    data: {
      email: 'workertest12345@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      updated_at: new Date(),
      role: 'Worker',
    },
  });
});

describe('Ticket UNIT tests', async () => {
  it('Creates Ticket', async () => {
    const ticketData = {
      description: faker.lorem.words(100),
      title: faker.airline.airport().name,
    };
    const ticket = await ticketService.createTicket(ticketData, worker);
    expect(ticket).not.toBeNull();
  });
  it('Updates Ticket', async () => {
    const ticketData = {
      description: faker.lorem.words(100),
      title: faker.airline.airport().name,
    };
    const ticket = await ticketService.createTicket(ticketData, worker);
    const updatedTicket = await ticketService.updateTicket(ticket.id, {
      title: ticket.title,
      description: faker.commerce.department(),
      status: 'On_Hold',
    });
    expect(updatedTicket.description).not.toBe(ticket.description);
    expect(updatedTicket.status).toBe('On_Hold');
  });
  it('Gets Ticket By ID', async () => {
    const ticketData = {
      description: faker.lorem.words(100),
      title: faker.airline.airport().name,
    };
    const ticket = await ticketService.createTicket(ticketData, worker);
    const getTicket = await ticketService.getTicketById(ticket.id);

    expect(getTicket).not.toBeNull();
    expect(getTicket.id).toBe(ticket.id);

    const getTicketWithWorkerId = await ticketService.getTicketById(
      ticket.id,
      worker.id,
    );

    expect(getTicketWithWorkerId).not.toBeNull();
    expect(getTicketWithWorkerId.id).toBe(ticket.id);
  });
  it('Get All tickets', async () => {
    const ticketData = {
      description: faker.lorem.words(100),
      title: faker.airline.airport().name,
    };
    let tickets = await ticketService.getAllTickets();
    expect(tickets.length).toBe(0);

    for (let i = 0; i < 10; i++) {
      await ticketService.createTicket(ticketData, worker);
    }
    tickets = await ticketService.getAllTickets();
    expect(tickets.length).toBe(10);
  });
});
