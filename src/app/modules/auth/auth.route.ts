import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post('/login', validateRequest(AuthValidation.loginZodSchema));

export const AuthRoutes = router;
