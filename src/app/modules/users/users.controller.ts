import { RequestHandler } from 'express'
import usersService from './users.service'

const createUserController: RequestHandler = async (req, res, next) => {
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

export const UserController = {
  createUserController,
}
