import { Router } from 'express';
import { teacherController } from '../controllers/teacher.controller';

const router = Router();

router.get('/', teacherController.getAllTeachers.bind(teacherController));
router.get('/:id', teacherController.getTeacherById.bind(teacherController));
router.post('/', teacherController.createTeacher.bind(teacherController));
router.put('/:id', teacherController.updateTeacher.bind(teacherController));
router.delete('/:id', teacherController.deleteTeacher.bind(teacherController));
router.get('/department/:departmentId', teacherController.getTeachersByDepartment.bind(teacherController));

export default router;
