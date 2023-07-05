import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/users.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
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

  const { id: userId, role, needsPasswordChange } = isUserExits;

  const accessToken = jwtHelpers.createToken(
    { id: userId, role },
    config.JWT_SECRET_KEY as Secret,
    config.JWT_EXPRIES_IN as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: userId, role },
    config.JWT_REFRESH_TOKEN as Secret,
    config.JWT_REFRESH_EXPRIES_IN as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshTokenService = async (token: string) => {
  // verify token is invalid
  let verifyToken = null;
  try {
    verifyToken = jwt.verify(token, config.JWT_REFRESH_TOKEN as Secret);

    console.log(verifyToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }
};

export const AuthService = {
  loginUserService,
  refreshTokenService,
};
