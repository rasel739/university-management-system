import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dbConnect from './utils/dbConnect'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/users.route'

const app: Application = express()

// Database connection functionality.

dbConnect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Router functionality

app.use('/api/v1/users/', UserRoutes)

// Testing request
app.get('/', async (req: Request, res: Response) => {
  res.send('University Management System Server is Running')
})

app.use(globalErrorHandler)

export default app
