import { Request, Response } from 'express';
import { projectService } from '../services/project.service';

export class ProjectController {
  async getAllProjects(_req: Request, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch projects',
      });
    }
  }

  async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch project',
      });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const project = await projectService.createProject(req.body);
      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create project',
      });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.updateProject(id, req.body);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update project',
      });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.deleteProject(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      res.json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete project',
      });
    }
  }

  async getProjectsByTopic(req: Request, res: Response) {
    try {
      const { topicId } = req.params;
      const projects = await projectService.getProjectsByTopic(topicId);
      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch projects',
      });
    }
  }
}

export const projectController = new ProjectController();
