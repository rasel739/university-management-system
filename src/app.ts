import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dbConnect from './utils/dbConnect';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

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

// global error handler
app.use(globalErrorHandler);

// Api route not found handler

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'NOT FOUND',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API NOT FOUND',
      },
    ],
  });
  next();
});

export default app;
