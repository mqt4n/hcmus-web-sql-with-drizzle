import { Router } from 'express';
import { statsController } from '../controllers/stats.controller';

const router = Router();

// Dashboard statistics - Aggregation demo (count, sum, avg, groupBy, having, orderBy)
router.get('/dashboard', statsController.getDashboardStats.bind(statsController));

// Overall system statistics
router.get('/overall', statsController.getOverallStats.bind(statsController));

// Teachers by gender statistics
router.get('/teachers/gender', statsController.getTeachersByGender.bind(statsController));

// Top teachers by salary
router.get('/teachers/top', statsController.getTopTeachers.bind(statsController));

// Projects by topic statistics
router.get('/projects/topics', statsController.getProjectsByTopic.bind(statsController));

export default router;
