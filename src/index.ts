import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cors());
app.use('/public', express.static(path.join(path.resolve(), 'public')));

//routes
app.use(routes());
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}`);
  });
}

export default app;
