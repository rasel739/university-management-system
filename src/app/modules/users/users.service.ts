import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateStudentId } from './users.utils';

const createUserService = async (user: IUser): Promise<IUser | null> => {
  // automatically generate id

  const id = await generateStudentId();

  user.id = id;

  // student default password

  if (!user.password) {
    user.password = config.DEFAULT_USER_PASS as string;
  }

  const createUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Faild to create user');
  }

  return createUser;
};

export const UserService = {
  createUserService,
};
