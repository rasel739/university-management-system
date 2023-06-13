import { Router } from 'express';
import { UserController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUserController
);

export const UserRoutes = router;
