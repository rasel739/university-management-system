import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dbConnect from './utils/dbConnect';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';

const app: Application = express();

// Database connection functionality.

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router

app.use('/api/v1/', routes);

// Testing request
app.get('/', async (req: Request, res: Response) => {
  res.send('University Management System Server is Running');
});

app.use(globalErrorHandler);

export default app;
