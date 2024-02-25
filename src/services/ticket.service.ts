import { Ticket } from '@prisma/client';
import { isNull } from 'lodash-es';
import { NotFoundError } from 'src/common/error.common';
import { AssignedTicketResponse, TicketRequest } from 'src/dtos/ticket.dto';
import { EntityName } from 'src/types/service.types';
import {
  createEntity,
  deleteEntity,
  findEntity,
  findManyEntities,
  updateEntity,
} from './crud.service';

const model: EntityName = 'ticket';

const createTicket = async (
  ticketData: TicketRequest,
  userID: number,
): Promise<Ticket> => {
  const newTicket = await createEntity(model, {
    data: {
      title: ticketData.title,
      description: ticketData.description,
      user_id: userID,
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
): Promise<AssignedTicketResponse> => {
  const ticket = await updateEntity(model, {
    data: {
      assigned_admin_id: adminId,
    },
    where: {
      id: ticketId,
    },
  });
  return { adminId: ticket.assigned_admin_id as number, ticketId: ticket.id };
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
