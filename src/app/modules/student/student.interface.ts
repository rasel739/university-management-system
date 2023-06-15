import { Model, Schema } from 'mongoose';

export type IGender = 'male' | 'female';

export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: IGender;
  bloodGroup: IBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardin: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    mother: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
  };
  localGuardin: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
  profileImage: string;
  academicFaculty: {
    type: Schema.Types.ObjectId;
    ref: 'academicFaculty';
  };
  academicDepartment: {
    type: Schema.Types.ObjectId;
    ref: 'academicDepartment';
  };
  academicSemester: {
    type: Schema.Types.ObjectId;
    ref: 'academicSemester';
  };
};

export type IStudentModel = Model<IStudent, Record<string, unknown>>;
