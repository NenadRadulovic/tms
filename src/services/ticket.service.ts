import { Ticket, User } from '@prisma/client';
import { isNull } from 'lodash-es';
import { AuthorizationError, NotFoundError } from 'src/common/error.common';
import { AssignedTicketResponse, TicketRequest } from 'src/dtos/ticket.dto';
import {
  EntityName,
  FindManyEntityData,
  TicketQuery,
} from 'src/types/service.types';
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

const getWorkerTicket = async (
  args: FindManyEntityData<'ticket'> = {},
): Promise<Ticket[]> => {
  return await findManyEntities(model, args);
};

const getAdminTicket = async (
  args: FindManyEntityData<'ticket'> = {},
): Promise<Ticket[]> => {
  return await findManyEntities(model, args);
};

const getAllTickets = async (
  user: User,
  args: TicketQuery = {},
): Promise<Ticket[]> => {
  switch (user.role) {
    case 'Worker':
      return await getWorkerTicket({
        where: {
          user_id: user.id,
          status: args.status,
        },
        orderBy: {
          created_at: args.created_at,
        },
      });
    case 'Admin':
      return await getAdminTicket({
        where: {
          OR: [
            {
              user_id: user.id,
            },
            {
              assigned_admin_id: user.id,
            },
          ],
          status: args.status,
        },
        orderBy: { created_at: args.created_at },
      });
    default:
      throw new AuthorizationError(
        'User role is not within the system requeirements',
      );
  }
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
