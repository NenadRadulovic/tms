import express, { Router } from 'express';
import tickets from './tickets';
import auth from './auth';
import swagger from './swagger';

const router = express.Router();

export default function routes(): Router {
  tickets(router);
  auth(router);
  swagger(router);
  return router;
}
