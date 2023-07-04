import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/users.model';
import { ILoginUser } from './auth.interface';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';

const loginUserService = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // is user exits

  const user = new User();

  const isUserExits = await user.isUserExists(id);
  if (!isUserExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //user match password

  if (
    isUserExits.password &&
    !user.isPasswordMatch(password, isUserExits?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create a access token & refres

  const accessToken = jwt.sign(
    {
      id: isUserExits?.id,
      role: isUserExits?.role,
    },
    config.JWT_SECRET_KEY as Secret,
    {
      expiresIn: config.JWT_EXPRIES_IN,
    }
  );

  const refreshToken = jwt.sign(
    {
      id: isUserExits?.id,
      role: isUserExits?.role,
    },
    config.JWT_REFRESH_TOKEN as Secret,
    {
      expiresIn: config.JWT_REFRESH_EXPRIES_IN,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUserService,
};
