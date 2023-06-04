import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body

    const result = await usersService.createUserService(user)

    res.status(200).json({
      sucess: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createUserController,
}
