import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type IAcademicFacultyModel = Model<IAcademicFaculty>;

export type IAcademicFacultyFilter = {
  searchTerm?: string;
};
