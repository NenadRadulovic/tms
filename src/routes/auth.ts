import { Router } from 'express';
import { register, login, me } from '../controllers/authentication.controller';
import { loginSchema, registerSchema } from '../validation/auth-schema';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { IsAuthenticated } from '../middlewares/guard';

export default (route: Router) => {
  route.post('/auth/register', registerSchema, validateRequestSchema, register);
  route.post('/auth/login', loginSchema, validateRequestSchema, login);
  route.get('/auth/me', IsAuthenticated, me);
};
