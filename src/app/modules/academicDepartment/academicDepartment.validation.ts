import { z } from 'zod';

const createAcademicDepartmentZod = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
    }),
  }),
});

const updateAcademicDepartmentZod = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZod,
  updateAcademicDepartmentZod,
};
