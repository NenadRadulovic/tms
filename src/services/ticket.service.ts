import { Ticket, User } from '@prisma/client';
import client from '@dbPrisma/client';
import { isNull } from 'lodash-es';
import {
  createEntity,
  deleteEntity,
  findEntity,
  findManyEntities,
  updateEntity,
} from './crud.service';
import { EntityName } from 'src/types/service.types';
import { TicketRequest } from 'src/dtos/ticket.dto';
import { NotFoundError } from 'src/common/error.common';

const model: EntityName = 'ticket';

const createTicket = async (
  ticketData: TicketRequest,
  userData: User,
): Promise<Ticket> => {
  const newTicket = await createEntity(model, {
    data: {
      title: ticketData.title,
      description: ticketData.description,
      user_id: userData.id,
    },
  });
  return newTicket;
};

const updateTicket = async (
  ticketid: number,
  ticketData: TicketRequest,
): Promise<Ticket> => {
  const result = updateEntity(model, {
    where: { id: ticketid },
    data: { ...ticketData },
  });
  if (isNull(result)) {
    throw new Error('error while updating ticket');
  }
  return result;
};
const assignTicket = async (
  adminId: number,
  ticketId: number,
): Promise<Ticket> => {
  const ticket = await client.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      assigned_admin_id: adminId,
    },
  });
  return ticket;
};
const getAllTickets = async (userId?: number): Promise<Ticket[]> => {
  const tickets = await findManyEntities(model, {
    where: { user_id: userId },
  });
  return tickets;
};
const getTicketById = async (
  ticketId: number,
  userId?: number,
): Promise<Ticket> => {
  const ticket = await findEntity(model, {
    where: { id: ticketId, user_id: userId },
  });
  if (isNull(ticket)) {
    throw new NotFoundError('Ticket not found');
  }
  return ticket;
};
const deleteTicket = async (id: number): Promise<Ticket> => {
  const result = await deleteEntity(model, { where: { id } });
  return result;
};

export default {
  createTicket,
  updateTicket,
  getAllTickets,
  getTicketById,
  deleteTicket,
  assignTicket,
};
