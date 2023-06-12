import { Router } from 'express';
import { UserRoutes } from '../app/modules/users/users.route';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
