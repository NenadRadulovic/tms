import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.disable('x-powered-by');
app.use(cors());
app.use(errorMiddleware);
app.use('/public', express.static(path.join(path.resolve(), 'public')));
//routes
app.use(routes());

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}`);
  });
}

export default app;
