import { Router } from 'express';
import { rawSQLTransController } from '../controllers/rawsql_trans.controller';

const router = Router();

// Raw SQL Demo: Get teachers with high salary
router.get('/high-earners', rawSQLTransController.getHighEarners.bind(rawSQLTransController));

// Mixed Query Demo: Query Builder + Raw SQL
router.get('/born-before/:year', rawSQLTransController.getTeachersBornBefore.bind(rawSQLTransController));

// Transaction Demo: Transfer salary between teachers
router.post('/transfer', rawSQLTransController.transferSalary.bind(rawSQLTransController));

router.post('/transfer-rollback-test', rawSQLTransController.transferSalaryRollbackTest.bind(rawSQLTransController));

export default router;
