import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepertment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentZod),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZod),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
