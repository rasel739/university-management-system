import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
