import { z } from 'zod';
import { gender } from '../student/student.constent';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
