/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student: Types.ObjectId | IStudent;
  // faculty:Types.ObjectId | IFaculty;
  // admin:Types.ObjectId | IFaculty;
};

export type IUserMethods = {
  isUserExists(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
