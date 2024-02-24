import client from '@dbPrisma/client';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import ticketService from '@services/ticket.service';
import { NotFoundError } from 'src/common/error.common';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

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

describe('Ticket Unit tests', async () => {
  it('Creates Ticket OK', async () => {
    const ticketData = {
      description: faker.lorem.words(100),
      title: faker.airline.airport().name,
    };
    const ticket = await ticketService.createTicket(ticketData, worker);
    expect(ticket).not.toBeNull();
  });
  it('Updates Ticket OK', async () => {
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
  it('Gets Ticket By Id OK', async () => {
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
  it('Deletes Ticket OK', async () => {
    const ticketData = {
      description: faker.lorem.words(100),
      title: faker.airline.airport().name,
    };
    const ticket = await ticketService.createTicket(ticketData, worker);
    expect(ticket).not.toBeNull();
    await ticketService.deleteTicket(ticket.id);
    expect(
      async () => await ticketService.getTicketById(ticket.id),
    ).rejects.toThrow(NotFoundError);
  });
  it('Get All tickets OK', async () => {
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
  it('Gets empty array when No Tickets OK', async () => {
    const tickets = await ticketService.getAllTickets();
    expect(tickets.length).toBe(0);
  });
  it('Updates non existant ticket NOT OK', async () => {
    expect(
      async () =>
        await ticketService.updateTicket(4910231232132121, {
          title: faker.commerce.product(),
          description: faker.commerce.department(),
          status: 'On_Hold',
        }),
    ).rejects.toThrow(NotFoundError);
  });
  it('Throws error when getting ticket by invalid Id NOT OK', async () => {
    expect(
      async () => await ticketService.getTicketById(123123),
    ).rejects.toThrow(NotFoundError);
  });
});
