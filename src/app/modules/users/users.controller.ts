import { NextFunction, Request, Response } from 'express';
import { UserService } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './users.interface';

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const result = await UserService.createUserService(user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createUserController,
};
