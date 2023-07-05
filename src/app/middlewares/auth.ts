import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiErrors';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token

      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access this page.'
        );
      }

      let verifyUser: any = null;

      verifyUser = jwtHelpers.verifyToken(
        token,
        config.JWT_SECRET_KEY as Secret
      );

      req.user = verifyUser;
      //   role guard

      if (requiredRole.length && !requiredRole.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
