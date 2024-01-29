import { createTicket, deleteTicket, getAllTickets, getTicket, updateTicket, assignTicket, } from '../controllers/ticketController.js';
import { IsAuthenticated } from '../middlewares/guard.js';
export default (route) => {
    route.get('/tickets', IsAuthenticated, getAllTickets);
    route.get('/tickets/:id', IsAuthenticated, getTicket);
    route.post('/tickets', IsAuthenticated, createTicket);
    route.put('/tickets/:id', IsAuthenticated, updateTicket);
    route.delete('/tickets/:id', IsAuthenticated, deleteTicket);
    route.post('/assign_ticket', IsAuthenticated, assignTicket);
};
//# sourceMappingURL=tickets.js.map