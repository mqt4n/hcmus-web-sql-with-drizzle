// src/routes/giaoVien.routes.js (hoặc đặt trong category.routes.js nếu bạn đang dùng nó)

import express from 'express';
import {
  getDanhSachGiaoVien,
  getGiaoVienChiTiet,
  taoMoiGiaoVien,
  capNhatGiaoVien,
  xoaGiaoVien,
} from '../controllers/teacher.controller.js'; // Đảm bảo đường dẫn đúng

const router = express.Router();

// Lấy tất cả giáo viên
router.get('/', getDanhSachGiaoVien); // GET /api/giaovien

// Lấy chi tiết giáo viên
router.get('/:magv', getGiaoVienChiTiet); // GET /api/giaovien/001

// Tạo mới giáo viên
router.post('/', taoMoiGiaoVien); // POST /api/giaovien

// Cập nhật giáo viên
router.put('/:magv', capNhatGiaoVien); // PUT /api/giaovien/001

// Xóa giáo viên
router.delete('/:magv', xoaGiaoVien); // DELETE /api/giaovien/001

export default router;
