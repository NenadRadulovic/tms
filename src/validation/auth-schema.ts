import { body } from 'express-validator';

export const loginSchema = [
  body('email').isEmail().withMessage('invalid email provided'),
  body('password').isLength({ min: 5 }),
];

export const logoutSchema = [body('email').isEmail()];

export const registerSchema = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('first_name').isString().isLength({ max: 255, min: 1 }),
  body('last_name').isString().isLength({ max: 255, min: 1 }),
  body('role').isString(),
];
