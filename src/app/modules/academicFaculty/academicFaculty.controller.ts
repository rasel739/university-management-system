import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constents/pagination.constents';
import { searchFilterAbleField } from './academicFaculty.constent';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultys } = req.body;

    const result = await AcademicFacultyService.createAcademicFacultyService(
      academicFacultys
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculaty created successfully.',
      data: result,
    });
  }
);

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationField);

  const filters = pick(req.query, searchFilterAbleField);

  const result = await AcademicFacultyService.getAcademicFacultyService(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrived successfully',
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getSingleFacultyService(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculaty single data successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AcademicFacultyService.updateFacultyService(
    id,
    updateData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty service updated successfully',
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.deleteSingleFacultyService(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty service deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
