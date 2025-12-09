import { sqliteTable, text, real, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const giaoVien = sqliteTable('GIAOVIEN', {
  magv: text('MAGV', { length: 10 }).notNull().primaryKey(),
  hoTen: text('HOTEN', { length: 50 }).notNull(),
  luong: real('LUONG').default(1000),
  phai: text('PHAI', { length: 3 }).notNull(),
  ngSinh: text('NGSINH'),
  diaChi: text('DIACHI', { length: 50 }),
  gvqlcm: text('GVQLCM', { length: 10 }),
  mabm: text('MABM', { length: 10 }),
});

export const nguoiThan = sqliteTable(
  'NGUOITHAN',
  {
    magv: text('MAGV', { length: 10 }).notNull(),
    ten: text('TEN', { length: 50 }).notNull(),
    ngSinh: text('NGSINH'),
    phai: text('PHAI', { length: 3 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.magv, table.ten] }),
    };
  }
);

export const khoa = sqliteTable('KHOA', {
  maKhoa: text('MAKHOA', { length: 10 }).notNull().primaryKey(),
  tenKhoa: text('TENKHOA', { length: 50 }),
  namTl: integer('NAMTL'),
  phong: text('PHONG', { length: 3 }),
  dienThoai: text('DIENTHOAI', { length: 10 }),
  truongKhoa: text('TRUONGKHOA', { length: 10 }),
  ngayNhanChuc: text('NGAYNHANCHUC'),
});

export const boMon = sqliteTable('BOMON', {
  mabm: text('MABM', { length: 10 }).notNull().primaryKey(),
  tenBm: text('TENBM', { length: 50 }),
  phong: text('PHONG', { length: 10 }),
  dienThoai: text('DIENTHOAI', { length: 10 }),
  truongBm: text('TRUONGBM', { length: 10 }),
  maKhoa: text('MAKHOA', { length: 10 }),
  ngayNhanChuc: text('NGAYNHANCHUC'),
});

export const gvDt = sqliteTable(
  'GV_DT',
  {
    magv: text('MAGV', { length: 10 }).notNull(),
    dienThoai: text('DIENTHOAI', { length: 10 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.magv, table.dienThoai] }),
    };
  }
);

export const chuDe = sqliteTable('CHUDE', {
  macd: text('MACD', { length: 10 }).notNull().primaryKey(),
  tenCd: text('TENCD', { length: 50 }),
});

export const deTai = sqliteTable('DETAI', {
  madt: text('MADT', { length: 10 }).notNull().primaryKey(),
  tenDt: text('TENDT', { length: 50 }),
  capQl: text('CAPQL', { length: 50 }),
  kinhPhi: real('KINHPHI'),
  ngayBd: text('NGAYBD'),
  ngayKt: text('NGAYKT'),
  macd: text('MACD', { length: 10 }),
  gvcnDt: text('GVCNDT', { length: 10 }),
});

export const congViec = sqliteTable(
  'CONGVIEC',
  {
    madt: text('MADT', { length: 10 }).notNull(),
    sott: integer('SOTT').notNull(),
    tenCv: text('TENCV', { length: 50 }),
    ngayBd: text('NGAYBD'),
    ngayKt: text('NGAYKT'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.madt, table.sott] }),
    };
  }
);

export const thamGiaDt = sqliteTable(
  'THAMGIADT',
  {
    magv: text('MAGV', { length: 10 }).notNull(),
    madt: text('MADT', { length: 10 }).notNull(),
    stt: integer('STT').notNull(),
    phuCap: real('PHUCAP'),
    ketQua: text('KETQUA', { length: 10 }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.magv, table.madt, table.stt] }),
    };
  }
);

export const giaoVienRelations = relations(giaoVien, ({ one, many }) => ({
  gvQuanLy: one(giaoVien, {
    fields: [giaoVien.gvqlcm],
    references: [giaoVien.magv],
    relationName: 'QuanLyCM',
  }),
  gvDuocQL: many(giaoVien, { relationName: 'QuanLyCM' }),

  boMon: one(boMon, {
    fields: [giaoVien.mabm],
    references: [boMon.mabm],
  }),

  nguoiThans: many(nguoiThan),

  deTaiChuNhiem: many(deTai),

  thamGiaDts: many(thamGiaDt),

  dienThoais: many(gvDt),
}));

export const nguoiThanRelations = relations(nguoiThan, ({ one }) => ({
  giaoVien: one(giaoVien, {
    fields: [nguoiThan.magv],
    references: [giaoVien.magv],
  }),
}));

export const boMonRelations = relations(boMon, ({ one, many }) => ({
  khoa: one(khoa, {
    fields: [boMon.maKhoa],
    references: [khoa.maKhoa],
  }),
  giaoViens: many(giaoVien),
  truongBm: one(giaoVien, {
    fields: [boMon.truongBm],
    references: [giaoVien.magv],
  }),
}));

export const khoaRelations = relations(khoa, ({ one, many }) => ({
  boMons: many(boMon),
  truongKhoa: one(giaoVien, {
    fields: [khoa.truongKhoa],
    references: [giaoVien.magv],
  }),
}));

export const chuDeRelations = relations(chuDe, ({ many }) => ({
  deTais: many(deTai),
}));

export const deTaiRelations = relations(deTai, ({ one, many }) => ({
  chuDe: one(chuDe, {
    fields: [deTai.macd],
    references: [chuDe.macd],
  }),
  giaoVienChuNhiem: one(giaoVien, {
    fields: [deTai.gvcnDt],
    references: [giaoVien.magv],
  }),
  congViecs: many(congViec),
  thamGiaDts: many(thamGiaDt),
}));

export const congViecRelations = relations(congViec, ({ one, many }) => ({
  deTai: one(deTai, {
    fields: [congViec.madt],
    references: [deTai.madt],
  }),
  thamGiaDts: many(thamGiaDt),
}));

export const thamGiaDtRelations = relations(thamGiaDt, ({ one }) => ({
  giaoVien: one(giaoVien, {
    fields: [thamGiaDt.magv],
    references: [giaoVien.magv],
  }),
  congViec: one(congViec, {
    fields: [thamGiaDt.madt, thamGiaDt.stt],
    references: [congViec.madt, congViec.sott],
  }),
  deTai: one(deTai, {
    fields: [thamGiaDt.madt],
    references: [deTai.madt],
  }),
}));

export const gvDtRelations = relations(gvDt, ({ one }) => ({
  giaoVien: one(giaoVien, {
    fields: [gvDt.magv],
    references: [giaoVien.magv],
  }),
}));

// --- KIỂU CHO GIAOVIEN ---
/** Kiểu dữ liệu trả về khi SELECT từ bảng GIAOVIEN */
export type GiaoVienSelect = typeof giaoVien.$inferSelect;
/** Kiểu dữ liệu dùng để INSERT vào bảng GIAOVIEN */
export type GiaoVienInsert = typeof giaoVien.$inferInsert;

// --- KIỂU CHO NGUOITHAN ---
export type NguoiThanSelect = typeof nguoiThan.$inferSelect;
export type NguoiThanInsert = typeof nguoiThan.$inferInsert;

// --- KIỂU CHO KHOA ---
export type KhoaSelect = typeof khoa.$inferSelect;
export type KhoaInsert = typeof khoa.$inferInsert;

// --- KIỂU CHO BOMON ---
export type BoMonSelect = typeof boMon.$inferSelect;
export type BoMonInsert = typeof boMon.$inferInsert;

// --- KIỂU CHO GV_DT ---
export type GvDtSelect = typeof gvDt.$inferSelect;
export type GvDtInsert = typeof gvDt.$inferInsert;

// --- KIỂU CHO CHUDE ---
export type ChuDeSelect = typeof chuDe.$inferSelect;
export type ChuDeInsert = typeof chuDe.$inferInsert;

// --- KIỂU CHO DETAI ---
export type DeTaiSelect = typeof deTai.$inferSelect;
export type DeTaiInsert = typeof deTai.$inferInsert;

// --- KIỂU CHO CONGVIEC ---
export type CongViecSelect = typeof congViec.$inferSelect;
export type CongViecInsert = typeof congViec.$inferInsert;

// --- KIỂU CHO THAMGIADT ---
export type ThamGiaDtSelect = typeof thamGiaDt.$inferSelect;
export type ThamGiaDtInsert = typeof thamGiaDt.$inferInsert;