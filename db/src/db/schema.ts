import { sqliteTable, text, real, integer, primaryKey, check, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const giaoVien = sqliteTable(
  'GIAOVIEN',
  {
    magv: text('MAGV', { length: 10 }).notNull().primaryKey(),
    hoTen: text('HOTEN', { length: 50 }).notNull(),
    luong: real('LUONG').default(1000),
    phai: text('PHAI', { length: 3 }).notNull(),
    ngSinh: text('NGSINH'),
    diaChi: text('DIACHI', { length: 50 }),
    gvqlcm: text('GVQLCM', { length: 10 }).references((): AnySQLiteColumn => giaoVien.magv, { onDelete: 'set null' }),
    mabm: text('MABM', { length: 10 }).references((): AnySQLiteColumn => boMon.mabm, { onDelete: 'set null' }),
  },
  (table) => [check('check_phai_giaovien', sql`${table.phai} IN ('Nam', 'Nữ')`)]
);

export const nguoiThan = sqliteTable(
  'NGUOITHAN',
  {
    magv: text('MAGV', { length: 10 })
      .notNull()
      .references(() => giaoVien.magv, { onDelete: 'cascade' }),
    ten: text('TEN', { length: 50 }).notNull(),
    ngSinh: text('NGSINH'),
    phai: text('PHAI', { length: 3 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.magv, table.ten] }),
      checkPhai: check('check_phai_nguoithan', sql`${table.phai} IN ('Nam', 'Nữ')`),
    };
  }
);

export const khoa = sqliteTable('KHOA', {
  maKhoa: text('MAKHOA', { length: 10 }).notNull().primaryKey(),
  tenKhoa: text('TENKHOA', { length: 50 }),
  namTl: integer('NAMTL'),
  phong: text('PHONG', { length: 3 }),
  dienThoai: text('DIENTHOAI', { length: 10 }),
  truongKhoa: text('TRUONGKHOA', { length: 10 }).references((): AnySQLiteColumn => giaoVien.magv, {
    onDelete: 'set null',
  }),
  ngayNhanChuc: text('NGAYNHANCHUC'),
});

export const boMon = sqliteTable('BOMON', {
  mabm: text('MABM', { length: 10 }).notNull().primaryKey(),
  tenBm: text('TENBM', { length: 50 }),
  phong: text('PHONG', { length: 10 }),
  dienThoai: text('DIENTHOAI', { length: 10 }),
  truongBm: text('TRUONGBM', { length: 10 }).references((): AnySQLiteColumn => giaoVien.magv, { onDelete: 'set null' }),
  maKhoa: text('MAKHOA', { length: 10 }).references(() => khoa.maKhoa, { onDelete: 'set null' }),
  ngayNhanChuc: text('NGAYNHANCHUC'),
});

export const gvDt = sqliteTable(
  'GV_DT',
  {
    magv: text('MAGV', { length: 10 })
      .notNull()
      .references(() => giaoVien.magv, { onDelete: 'cascade' }),
    dienThoai: text('DIENTHOAI', { length: 10 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.magv, table.dienThoai] })]
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
  macd: text('MACD', { length: 10 }).references(() => chuDe.macd, { onDelete: 'set null' }),
  gvcnDt: text('GVCNDT', { length: 10 }).references(() => giaoVien.magv, { onDelete: 'set null' }),
});

export const congViec = sqliteTable(
  'CONGVIEC',
  {
    madt: text('MADT', { length: 10 })
      .notNull()
      .references(() => deTai.madt, { onDelete: 'cascade' }),
    sott: integer('SOTT').notNull(),
    tenCv: text('TENCV', { length: 50 }),
    ngayBd: text('NGAYBD'),
    ngayKt: text('NGAYKT'),
  },
  (table) => [primaryKey({ columns: [table.madt, table.sott] })]
);

export const thamGiaDt = sqliteTable(
  'THAMGIADT',
  {
    magv: text('MAGV', { length: 10 })
      .notNull()
      .references(() => giaoVien.magv, { onDelete: 'cascade' }),
    madt: text('MADT', { length: 10 })
      .notNull()
      .references(() => deTai.madt, { onDelete: 'cascade' }),
    stt: integer('STT').notNull(),
    phuCap: real('PHUCAP'),
    ketQua: text('KETQUA', { length: 10 }),
  },
  (table) => [primaryKey({ columns: [table.magv, table.madt, table.stt] })]
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
