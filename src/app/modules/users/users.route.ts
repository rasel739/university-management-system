import { Router } from 'express'
import { UserController } from './users.controller'

const router = Router()

router.post('/create-user', UserController.createUserController)

export const UserRoutes = router
