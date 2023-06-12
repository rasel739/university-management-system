import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination.interface';
import { academicDepartMentSearchAbleField } from './academicDepartment.constent';
import { AcademicDepartment } from './academicDepartment.model';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepertment.interface';
import { IGenericPaginationResponse } from '../../../interfaces/common.interface';

const createDepartmentService = async (payload: IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );

  return result;
};

const getAllDepartmentService = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicDepartment[]>> => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartMentSearchAbleField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );

  return result;
};

const updateDepartmentService = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');

  return result;
};

const deleteDepartmentService = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);

  return result;
};

export const AcademicDepartmentService = {
  createDepartmentService,
  getAllDepartmentService,
  getSingleDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
};
