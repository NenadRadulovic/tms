import { Router } from 'express';
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  assignTicket,
} from '../controllers/ticketController';
import { IsAuthenticated } from '../middlewares/guard';

export default (route: Router) => {
  route.get('/tickets', IsAuthenticated, getAllTickets);
  route.get('/tickets/:id', IsAuthenticated, getTicket);
  route.post('/tickets', IsAuthenticated, createTicket);
  route.put('/tickets/:id', IsAuthenticated, updateTicket);
  route.delete('/tickets/:id', IsAuthenticated, deleteTicket);
  route.post('/assign_ticket', IsAuthenticated, assignTicket);
};
