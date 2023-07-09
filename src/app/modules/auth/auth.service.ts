import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/users.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';

const userMethod = new User();

const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // is user exits

  const isUserExits = await userMethod.isUserExists(id);
  if (!isUserExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //user match password

  if (
    isUserExits.password &&
    !userMethod.isPasswordMatch(password, isUserExits?.password)
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

  const { userId } = verifyToken;

  const isUserExits = await userMethod.isUserExists(userId);

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

const changePasswordService = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExists = await userMethod.isUserExists(user?.userId);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //user match password

  if (
    isUserExists.password &&
    !(await userMethod.isPasswordMatch(oldPassword, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // new hash password saved

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.BCRYPT_SALT_ROUNDS)
  );

  // user update password

  const updateData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate({ id: user?.userId }, updateData);
};

export const AuthService = {
  loginUserService,
  refreshTokenService,
  changePasswordService,
};
