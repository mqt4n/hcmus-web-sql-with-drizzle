import { Request, Response } from 'express';
import { statsService } from '../services/stats.service';

export class StatsController {
  async getDashboardStats(_req: Request, res: Response) {
    try {
      const stats = await statsService.getDashboardStats();

      res.json({
        success: true,
        message: 'Dashboard statistics retrieved successfully',
        count: stats.length,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch dashboard stats',
      });
    }
  }

  async getOverallStats(_req: Request, res: Response) {
    try {
      const stats = await statsService.getOverallStats();

      res.json({
        success: true,
        message: 'Overall statistics retrieved successfully',
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch overall stats',
      });
    }
  }

  async getTeachersByGender(_req: Request, res: Response) {
    try {
      const stats = await statsService.getTeachersByGender();

      res.json({
        success: true,
        message: 'Teachers by gender statistics retrieved successfully',
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch gender stats',
      });
    }
  }

  async getTopTeachers(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const stats = await statsService.getTopTeachersBySalary(limit);

      res.json({
        success: true,
        message: `Top ${limit} teachers by salary retrieved successfully`,
        count: stats.length,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch top teachers',
      });
    }
  }

  async getProjectsByTopic(_req: Request, res: Response) {
    try {
      const stats = await statsService.getProjectsByTopic();

      res.json({
        success: true,
        message: 'Projects by topic statistics retrieved successfully',
        count: stats.length,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch projects by topic',
      });
    }
  }
}

export const statsController = new StatsController();
