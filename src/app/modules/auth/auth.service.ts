import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/users.model';
import { ILoginUser } from './auth.interface';
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
};

export const AuthService = {
  loginUserService,
};
