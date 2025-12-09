import {
  getAllGiaoVienService,
  getGiaoVienByIdService,
  createGiaoVienService,
  updateGiaoVienService,
  deleteGiaoVienService,
} from '../services/teacher.service.js'; // Đảm bảo đường dẫn đúng

// --- CONTROLLERS CHO GIAOVIEN ---

export async function getDanhSachGiaoVien(req, res) {
  try {
    const danhSachGV = await getAllGiaoVienService();
    res.status(200).json(danhSachGV);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách GV:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
}

export async function getGiaoVienChiTiet(req, res) {
  try {
    const { magv } = req.params; // Lấy MAGV từ URL params
    const gv = await getGiaoVienByIdService(magv);

    if (!gv) {
      return res.status(404).json({ message: `Không tìm thấy Giáo Viên với mã ${magv}.` });
    }

    res.status(200).json(gv);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết GV:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
}

export async function taoMoiGiaoVien(req, res) {
  try {
    const newGvData = req.body; // Lấy dữ liệu từ body request

    // Kiểm tra dữ liệu bắt buộc (Tối thiểu cho bảng này)
    if (!newGvData.magv || !newGvData.hoTen || !newGvData.phai) {
      return res.status(400).json({ message: 'Thiếu các trường bắt buộc (magv, hoTen, phai).' });
    }

    const result = await createGiaoVienService(newGvData);
    res.status(201).json({ message: 'Thêm Giáo Viên thành công.', data: result });
  } catch (error) {
    console.error('Lỗi khi tạo GV mới:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
}

export async function capNhatGiaoVien(req, res) {
  try {
    const { magv } = req.params;
    const updateData = req.body;

    const result = await updateGiaoVienService(magv, updateData);

    // Kiểm tra nếu không có hàng nào bị ảnh hưởng
    // (Lưu ý: Drizzle SQLite trả về {changes: 0, lastInsertRowid: ...} khi không có thay đổi)
    if (result.changes === 0) {
      // Thử kiểm tra sự tồn tại trước khi trả về 404
      const checkExist = await getGiaoVienByIdService(magv);
      if (!checkExist) {
        return res.status(404).json({ message: `Không tìm thấy Giáo Viên với mã ${magv} để cập nhật.` });
      }
    }

    res.status(200).json({ message: 'Cập nhật Giáo Viên thành công.', changes: result.changes });
  } catch (error) {
    console.error('Lỗi khi cập nhật GV:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
}

export async function xoaGiaoVien(req, res) {
  try {
    const { magv } = req.params;
    const result = await deleteGiaoVienService(magv);

    if (result.changes === 0) {
      return res.status(404).json({ message: `Không tìm thấy Giáo Viên với mã ${magv} để xóa.` });
    }

    res.status(200).json({ message: 'Xóa Giáo Viên thành công.', changes: result.changes });
  } catch (error) {
    console.error('Lỗi khi xóa GV:', error);
    // Lưu ý: Lỗi Foreign Key sẽ bị bắt ở đây nếu GV này có liên quan
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
}
