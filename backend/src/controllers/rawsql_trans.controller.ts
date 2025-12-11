import { Request, Response } from 'express';
import { rawSQLTransService } from '../services/rawsql_trans.service';

export class RawSQLTransController {
  /**
   * GET /api/salary/high-earners?minSalary=2000
   * Raw SQL Demo: Get teachers earning above minimum salary
   */
  async getHighEarners(req: Request, res: Response) {
    try {
      const minSalary = req.query.minSalary ? Number(req.query.minSalary) : 2000;

      if (isNaN(minSalary)) {
        return res.status(400).json({
          success: false,
          message: 'minSalary must be a valid number',
        });
      }

      const teachers = await rawSQLTransService.getHighEarners(minSalary);

      res.json({
        success: true,
        query: 'Raw SQL',
        criteria: `LUONG > ${minSalary}`,
        count: teachers.length,
        data: teachers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch high earners',
      });
    }
  }

  /**
   * GET /api/salary/born-before/:year
   * Mixed Query Demo: Query Builder + Raw SQL WHERE clause
   */
  async getTeachersBornBefore(req: Request, res: Response) {
    try {
      const { year } = req.params;

      if (!year || isNaN(Number(year))) {
        return res.status(400).json({
          success: false,
          message: 'Year must be a valid number',
        });
      }

      const teachers = await rawSQLTransService.getTeachersBornBefore(year);

      res.json({
        success: true,
        query: 'Query Builder + Raw SQL',
        criteria: `Born before ${year}`,
        count: teachers.length,
        data: teachers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch teachers',
      });
    }
  }

  /**
   * POST /api/salary/transfer
   * Transaction Demo: Transfer salary between teachers atomically
   * Body: { fromTeacherId, toTeacherId, amount }
   */
  async transferSalary(req: Request, res: Response) {
    try {
      const { fromTeacherId, toTeacherId, amount } = req.body;

      if (!fromTeacherId || !toTeacherId || !amount) {
        return res.status(400).json({
          success: false,
          message: 'fromTeacherId, toTeacherId, and amount are required',
        });
      }

      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a positive number',
        });
      }

      if (fromTeacherId === toTeacherId) {
        return res.status(400).json({
          success: false,
          message: 'Cannot transfer to the same teacher',
        });
      }

      const result = await rawSQLTransService.transferSalary(
        fromTeacherId,
        toTeacherId,
        Number(amount)
      );

      res.json({
        success: true,
        message: 'Salary transferred successfully',
        transaction: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Transaction failed',
      });
    }
  }

  async transferSalaryRollbackTest(req: Request, res: Response) {
    try {
      const { fromTeacherId, toTeacherId, amount } = req.body;

      if (!fromTeacherId || !toTeacherId || !amount) {
        return res.status(400).json({
          success: false,
          message: 'fromTeacherId, toTeacherId, and amount are required',
        });
      }

      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a positive number',
        });
      }

      if (fromTeacherId === toTeacherId) {
        return res.status(400).json({
          success: false,
          message: 'Cannot transfer to the same teacher',
        });
      }

      const result = await rawSQLTransService.transferSalaryRollbackTest(
        fromTeacherId,
        toTeacherId,
        Number(amount)
      );

      res.json({
        success: true,
        message: 'Salary transferred rollback test',
        transaction: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Transaction failed',
      });
    }
  }
}

export const rawSQLTransController = new RawSQLTransController();
