import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;

    const result = await AcademicSemesterService.createAcademicSemesterService(
      academicSemester
    );

    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
