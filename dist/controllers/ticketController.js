import ticketService from '../services/ticketService.js';
import { get } from 'lodash-es';
export const getAllTickets = async (req, res) => {
    try {
        const user = get(req, 'identity');
        const tickets = await ticketService.getAllTickets(user.id);
        return res.status(200).json({ data: tickets });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const getTicket = async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const user = get(req, 'identity');
        if (user === undefined) {
            return res.status(400).json({ errorMessage: 'token error' });
        }
        return res
            .status(200)
            .json({ data: ticketService.getTicketById(id, user.id) });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const createTicket = async (req, res) => {
    try {
        const ticketData = req.body;
        const user = get(req, 'identity');
        const newTicket = await ticketService.createTicket(ticketData, user);
        return res.status(200).json({ data: newTicket });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const updateTicket = async (req, res) => {
    try {
        const ticketData = req.body;
        const ticketId = Number(req.params.id);
        return res
            .status(200)
            .json({ data: ticketService.updateTicket(ticketId, ticketData) });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const deleteTicket = async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id) || -1;
        return res.status(200).json({ data: ticketService.deleteTicket(id) });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const assignTicket = async (req, res) => {
    try {
        const ticketData = req.body.ticket_id;
        const user = get(req, 'identity');
        const result = await ticketService.assignTicket(user.id, ticketData);
        return res.status(200).json({ data: result });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
//# sourceMappingURL=ticketController.js.map