import { Request, Response } from 'express';
import { teacherService } from '../services/teacher.service';

export class TeacherController {
  async getAllTeachers(_req: Request, res: Response) {
    try {
      const teachers = await teacherService.getAllTeachers();
      res.json({
        success: true,
        data: teachers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch teachers',
      });
    }
  }

  async getTeacherById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await teacherService.getTeacherById(id);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }

      res.json({
        success: true,
        data: teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch teacher',
      });
    }
  }

  async createTeacher(req: Request, res: Response) {
    try {
      const teacher = await teacherService.createTeacher(req.body);
      res.status(201).json({
        success: true,
        data: teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create teacher',
      });
    }
  }

  async updateTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await teacherService.updateTeacher(id, req.body);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }

      res.json({
        success: true,
        data: teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update teacher',
      });
    }
  }

  async deleteTeacher(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await teacherService.deleteTeacher(id);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }

      res.json({
        success: true,
        message: 'Teacher deleted successfully',
        data: teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete teacher',
      });
    }
  }

  async getTeachersByDepartment(req: Request, res: Response) {
    try {
      const { departmentId } = req.params;
      const teachers = await teacherService.getTeachersByDepartment(departmentId);
      res.json({
        success: true,
        data: teachers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch teachers',
      });
    }
  }
}

export const teacherController = new TeacherController();
