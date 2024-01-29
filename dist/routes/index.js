import express from 'express';
import tickets from './tickets.js';
import auth from './auth.js';
const router = express.Router();
export default function routus() {
    tickets(router);
    auth(router);
    return router;
}
//# sourceMappingURL=index.js.map