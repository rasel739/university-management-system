import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
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
    { userId, role },
    config.JWT_SECRET_KEY as Secret,
    config.JWT_EXPRIES_IN as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.JWT_REFRESH_TOKEN as Secret,
    config.JWT_REFRESH_EXPRIES_IN as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  // verify token is invalid
  let verifyToken: any = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.JWT_REFRESH_TOKEN as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  const user = new User();
  const { userId } = verifyToken;

  const isUserExits = await user.isUserExists(userId);

  if (!isUserExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExits?.id, role: isUserExits?.role },
    config.JWT_SECRET_KEY as Secret,
    config.JWT_EXPRIES_IN as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUserService,
  refreshTokenService,
};
