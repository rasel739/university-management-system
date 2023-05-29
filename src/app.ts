import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dbConnect from './utils/dbConnect';


const app: Application = express();

// Database connection functionality.

dbConnect();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Testing request
app.get('/', (req: Request, res: Response) => {

    res.send('University Management System Server is Running');
});


export default app;

