import { Request, Response } from 'express';
import { topicService } from '../services/topic.service';

export class TopicController {
  async getAllTopics(_req: Request, res: Response) {
    try {
      const topics = await topicService.getAllTopics();
      res.json({
        success: true,
        data: topics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch topics',
      });
    }
  }

  async getTopicById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const topic = await topicService.getTopicById(id);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: 'Topic not found',
        });
      }

      res.json({
        success: true,
        data: topic,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch topic',
      });
    }
  }

  async createTopic(req: Request, res: Response) {
    try {
      const topic = await topicService.createTopic(req.body);
      res.status(201).json({
        success: true,
        data: topic,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create topic',
      });
    }
  }

  async updateTopic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const topic = await topicService.updateTopic(id, req.body);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: 'Topic not found',
        });
      }

      res.json({
        success: true,
        data: topic,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update topic',
      });
    }
  }

  async deleteTopic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const topic = await topicService.deleteTopic(id);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: 'Topic not found',
        });
      }

      res.json({
        success: true,
        message: 'Topic deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete topic',
      });
    }
  }
}

export const topicController = new TopicController();
