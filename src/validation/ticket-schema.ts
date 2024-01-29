import { body } from 'express-validator';

export const createTicketSchema = [
  body('title').isAlphanumeric(),
  body('description').isAlphanumeric().isLength({ max: 1000 }),
];
