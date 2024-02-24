import { TicketRequest } from '@dtos/ticket.dto';
import { User } from '@prisma/client';
import ticketService from '@services/ticket.service';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { get } from 'lodash-es';

export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = get<JwtPayload, 'identity'>(req, 'identity');
    const tickets = await ticketService.getAllTickets(user.id);
    return res.status(200).json({ data: tickets });
  } catch (err) {
    next(err);
  }
};

export const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number.parseInt(req.params.id);
    const user: JwtPayload = get<JwtPayload, 'identity'>(req, 'identity');
    if (user === undefined) {
      return res.status(400).json({ errorMessage: 'token error' });
    }
    return res
      .status(200)
      .json({ data: ticketService.getTicketById(id, user.id) });
  } catch (err) {
    next(err);
  }
};

export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticketData: TicketRequest = req.body;
    const user: JwtPayload = get<JwtPayload, 'identity'>(req, 'identity');
    const newTicket = await ticketService.createTicket(
      ticketData,
      user as User,
    );
    return res.status(200).json({ data: newTicket });
  } catch (err) {
    next(err);
  }
};
export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticketData = req.body;
    const ticketId = Number(req.params.id);
    return res
      .status(200)
      .json({ data: ticketService.updateTicket(ticketId, ticketData) });
  } catch (err) {
    next(err);
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number.parseInt(req.params.id) || -1;
    return res.status(200).json({ data: ticketService.deleteTicket(id) });
  } catch (err) {
    next(err);
  }
};

export const assignTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticketData: number = req.body.ticket_id;
    const user: JwtPayload = get<JwtPayload, 'identity'>(req, 'identity');
    const result = await ticketService.assignTicket(user.id, ticketData);
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};
