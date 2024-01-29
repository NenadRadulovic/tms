import express, { Router } from 'express';
import tickets from './tickets';
import auth from './auth';

const router = express.Router();

export default function routus(): Router {
  tickets(router);
  auth(router);
  return router;
}
