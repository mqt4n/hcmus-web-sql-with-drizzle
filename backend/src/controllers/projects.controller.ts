import { Request, Response } from 'express';
import { projectsService } from '../services/projects.service';

export class ProjectsController {
  /**
   * GET /api/projects/flat
   *
   * STYLE 1: Dữ liệu phẳng (Flat Data) - Dùng cho Báo cáo
   *
   * Sử dụng JOIN thủ công để trả về dữ liệu dạng bảng phẳng.
   * Mỗi row = 1 giáo viên tham gia đề tài (có thể lặp lại maDeTai).
   *
   * Use cases:
   * - Export CSV/Excel
   * - Báo cáo tài chính, thống kê
   * - Pivot table trong BI tools
   * - SQL-like reporting
   *
   * Output structure:
   * [
   *   { maDeTai: "DT01", tenDeTai: "AI Golf", tenGiaoVien: "Khoa", phuCap: 100 },
   *   { maDeTai: "DT01", tenDeTai: "AI Golf", tenGiaoVien: "Huy", phuCap: 200 },
   *   { maDeTai: "DT02", tenDeTai: "Web App", tenGiaoVien: null, phuCap: null }
   * ]
   */
  async getFlatProjects(_req: Request, res: Response) {
    try {
      const projects = await projectsService.getFlatProjects();

      res.json({
        success: true,
        message: 'Flat data retrieved successfully (suitable for reports)',
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch flat projects',
      });
    }
  }

  /**
   * GET /api/projects/nested
   *
   * STYLE 2: Dữ liệu lồng (Nested JSON) - Dùng cho Web/App
   *
   * Sử dụng Relational Queries để trả về JSON có cấu trúc lồng.
   * Mỗi đề tài chỉ xuất hiện 1 lần với array giáo viên tham gia.
   *
   * Use cases:
   * - REST API cho Web/Mobile
   * - Single Page Applications (React, Vue)
   * - GraphQL-like responses
   * - JSON data visualization
   *
   * Output structure:
   * [
   *   {
   *     madt: "DT01",
   *     tenDt: "AI Golf",
   *     kinhPhi: 500000,
   *     chuDe: { macd: "CD01", tenCd: "AI" },
   *     giaoVienChuNhiem: { magv: "001", hoTen: "Nguyễn An" },
   *     thamGiaDts: [
   *       { phuCap: 100, giaoVien: { hoTen: "Khoa" }, congViec: {...} },
   *       { phuCap: 200, giaoVien: { hoTen: "Huy" }, congViec: {...} }
   *     ],
   *     congViecs: [...]
   *   }
   * ]
   */
  async getNestedProjects(_req: Request, res: Response) {
    try {
      const projects = await projectsService.getNestedProjects();

      res.json({
        success: true,
        message: 'Nested data retrieved successfully (suitable for web/mobile apps)',
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch nested projects',
      });
    }
  }

  /**
   * GET /api/projects/:id
   *
   * Lấy chi tiết 1 đề tài với nested data
   */
  async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectsService.getNestedProjectById(id);

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
}

export const projectsController = new ProjectsController();
