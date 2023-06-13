// generate automatically user id

import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string | undefined> => {
  const currentUserId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // user id increment by 1

  let incrementId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');

  incrementId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementId}`;
  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
