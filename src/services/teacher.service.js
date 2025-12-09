import { db } from '../db/drizzle.js';
import { giaoVien } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// --- SERVICE CHO GIAOVIEN ---

/**
 * @desc Lấy tất cả Giáo Viên
 * @returns {Promise<Array<Object>>} Danh sách giáo viên
 */
export async function getAllGiaoVienService() {
  // Drizzle select all
  const danhSachGV = await db.select().from(giaoVien).execute();
  return danhSachGV;
}

/**
 * @desc Lấy chi tiết Giáo Viên theo MAGV
 * @param {string} magv - Mã Giáo Viên (PK)
 * @returns {Promise<Object | undefined>} Thông tin giáo viên
 */
export async function getGiaoVienByIdService(magv) {
  // Drizzle select one by primary key (where and limit 1)
  const gv = await db.select().from(giaoVien).where(eq(giaoVien.magv, magv)).limit(1).execute();

  return gv[0]; // Trả về đối tượng đầu tiên hoặc undefined
}

/**
 * @desc Thêm một Giáo Viên mới
 * @param {Object} data - Dữ liệu giáo viên mới (HOTEN, LUONG, PHAI, ...)
 * @returns {Promise<Object>} Giáo viên vừa được thêm (hoặc số hàng bị ảnh hưởng)
 */
export async function createGiaoVienService(data) {
  // Drizzle insert. Lưu ý: Cần đảm bảo các cột không NULL (như MAGV, HOTEN, PHAI)
  // Nếu bạn muốn trả về đối tượng vừa thêm, dùng .returning()
  const result = await db
    .insert(giaoVien)
    .values({
      magv: data.magv,
      hoTen: data.hoTen,
      luong: data.luong,
      phai: data.phai,
      ngSinh: data.ngSinh,
      diaChi: data.diaChi,
      gvqlcm: data.gvqlcm,
      mabm: data.mabm,
    })
    .execute();

  // Với SQLite, insert thường trả về một đối tượng chứa lastInsertRowid
  return result;
}

/**
 * @desc Cập nhật thông tin Giáo Viên
 * @param {string} magv - Mã Giáo Viên cần cập nhật
 * @param {Object} data - Dữ liệu cập nhật
 * @returns {Promise<Object>} Kết quả update
 */
export async function updateGiaoVienService(magv, data) {
  // Drizzle update.
  const result = await db
    .update(giaoVien)
    .set(data) // Drizzle tự động map các trường từ object data
    .where(eq(giaoVien.magv, magv))
    .execute();

  return result;
}

/**
 * @desc Xóa Giáo Viên theo MAGV
 * @param {string} magv - Mã Giáo Viên cần xóa
 * @returns {Promise<Object>} Kết quả xóa
 */
export async function deleteGiaoVienService(magv) {
  // Drizzle delete
  const result = await db.delete(giaoVien).where(eq(giaoVien.magv, magv)).execute();

  return result;
}
