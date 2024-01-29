import { register, login, me } from '../controllers/authenticationController.js';
import { loginSchema, registerSchema } from '../validation/auth-schema.js';
import { validateRequestSchema } from '../middlewares/validate-request-schema.js';
import { IsAuthenticated } from '../middlewares/guard.js';
export default (route) => {
    route.post('/auth/register', registerSchema, validateRequestSchema, register);
    route.post('/auth/login', loginSchema, validateRequestSchema, login);
    route.get('/auth/me', IsAuthenticated, me);
};
//# sourceMappingURL=auth.js.map