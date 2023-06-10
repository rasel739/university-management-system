import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemester.constent';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination.interface';
import { IGenericPaginationResponse } from '../../../interfaces/common.interface';
import { paginationHelper } from '../../../helpers/paginationHelpers';

const createAcademicSemesterService = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Title Code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllSemestersService = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginationOptions);

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemesterService,
  getAllSemestersService,
};
