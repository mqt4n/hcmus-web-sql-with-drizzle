import { Router } from 'express';
import { projectsController } from '../controllers/projects.controller';

const router = Router();

// STYLE 1: Flat data - Dữ liệu phẳng dạng bảng (JOIN thủ công)
router.get('/flat', projectsController.getFlatProjects.bind(projectsController));

// STYLE 2: Nested data - Dữ liệu lồng dạng JSON (Relational Queries)
router.get('/nested', projectsController.getNestedProjects.bind(projectsController));

// Get single project by ID with nested data
router.get('/:id', projectsController.getProjectById.bind(projectsController));

export default router;
