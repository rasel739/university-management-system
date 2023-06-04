import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error.interface'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiErrors'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 5000
  let message = 'Somthing went wrong !'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: true,
    message,
    errorMessage,
    stack: config.ENV !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
