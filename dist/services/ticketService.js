import client from '../prisma/client.js';
import { isNull } from 'lodash-es';
const createTicket = async (ticketData, userData) => {
    try {
        const newTicket = await client.ticket.create({
            data: {
                status: 'Open',
                title: ticketData.title,
                description: ticketData.description,
                user_id: userData.id,
                updated_at: new Date(),
            },
        });
        return newTicket;
    }
    catch (e) {
        return undefined;
    }
};
const updateTicket = async (ticketid, ticketData) => {
    const result = await client.ticket.update({
        where: { id: ticketid },
        data: { ...ticketData },
    });
    if (isNull(result)) {
        throw new Error('error while updating ticket');
    }
    return result;
};
const assignTicket = async (adminId, ticketId) => {
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
const getAllTickets = async (userId) => {
    const tickets = await client.ticket.findMany({
        where: { user_id: userId },
    });
    if (isNull(tickets)) {
        throw new Error('no tickets found');
    }
    return tickets;
};
const getTicketById = async (ticketId, userId) => {
    const ticket = await client.ticket.findFirst({
        where: {
            id: ticketId,
            user_id: userId,
        },
    });
    if (isNull(ticket)) {
        throw new Error('Ticket not found');
    }
    return ticket;
};
const deleteTicket = async (id) => {
    const result = client.ticket.delete({
        where: { id },
    });
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
//# sourceMappingURL=ticketService.js.map