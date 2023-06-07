import { Request, Response } from 'express';
import { UserService } from './users.service';
import catchAsync from '../../../shared/catchAsync';

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;

  const result = await UserService.createUserService(user);

  res.status(200).json({
    sucess: true,
    message: 'user created successfully',
    data: result,
  });
});

export const UserController = {
  createUserController,
};
