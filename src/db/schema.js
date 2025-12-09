import { sqliteTable, text, real, integer, primaryKey, foreignKey } from 'drizzle-orm/sqlite-core';

export const giaoVien = sqliteTable(
  'GIAOVIEN',
  {
    magv: text('MAGV', { length: 10 }).notNull().primaryKey(),
    hoTen: text('HOTEN', { length: 50 }).notNull(),
    luong: real('LUONG').default(1000),
    phai: text('PHAI', { length: 3 }).notNull(),
    ngSinh: text('NGSINH'),
    diaChi: text('DIACHI', { length: 50 }),
    gvqlcm: text('GVQLCM', { length: 10 }),
    mabm: text('MABM', { length: 10 }),
  },
  (table) => {
    return {
      gvqlcmFk: foreignKey(() => ({
        columns: [table.gvqlcm],
        foreignColumns: [table.magv],
      })),
    };
  }
);

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
      magvFk: foreignKey(() => ({
        columns: [table.magv],
        foreignColumns: [giaoVien.magv],
      })),
    };
  }
);

export const khoa = sqliteTable(
  'KHOA',
  {
    maKhoa: text('MAKHOA', { length: 10 }).notNull().primaryKey(),
    tenKhoa: text('TENKHOA', { length: 50 }),
    namTl: integer('NAMTL'),
    phong: text('PHONG', { length: 3 }),
    dienThoai: text('DIENTHOAI', { length: 10 }),
    truongKhoa: text('TRUONGKHOA', { length: 10 }),
    ngayNhanChuc: text('NGAYNHANCHUC'),
  },
  (table) => {
    return {
      truongKhoaFk: foreignKey(() => ({
        columns: [table.truongKhoa],
        foreignColumns: [giaoVien.magv],
      })),
    };
  }
);

export const boMon = sqliteTable(
  'BOMON',
  {
    mabm: text('MABM', { length: 10 }).notNull().primaryKey(),
    tenBm: text('TENBM', { length: 50 }),
    phong: text('PHONG', { length: 10 }),
    dienThoai: text('DIENTHOAI', { length: 10 }),
    truongBm: text('TRUONGBM', { length: 10 }),
    maKhoa: text('MAKHOA', { length: 10 }),
    ngayNhanChuc: text('NGAYNHANCHUC'),
  },
  (table) => {
    return {
      truongBmFk: foreignKey(() => ({
        columns: [table.truongBm],
        foreignColumns: [giaoVien.magv],
      })),
      maKhoaFk: foreignKey(() => ({
        columns: [table.maKhoa],
        foreignColumns: [khoa.maKhoa],
      })),
    };
  }
);

export const gvDt = sqliteTable(
  'GV_DT',
  {
    magv: text('MAGV', { length: 10 }).notNull(),
    dienThoai: text('DIENTHOAI', { length: 10 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.magv, table.dienThoai] }),
      magvFk: foreignKey(() => ({
        columns: [table.magv],
        foreignColumns: [giaoVien.magv],
      })),
    };
  }
);

export const chuDe = sqliteTable('CHUDE', {
  macd: text('MACD', { length: 10 }).notNull().primaryKey(),
  tenCd: text('TENCD', { length: 50 }),
});

export const deTai = sqliteTable(
  'DETAI',
  {
    madt: text('MADT', { length: 10 }).notNull().primaryKey(),
    tenDt: text('TENDT', { length: 50 }),
    capQl: text('CAPQL', { length: 50 }),
    kinhPhi: real('KINHPHI'),
    ngayBd: text('NGAYBD'),
    ngayKt: text('NGAYKT'),
    macd: text('MACD', { length: 10 }),
    gvcnDt: text('GVCNDT', { length: 10 }),
  },
  (table) => {
    return {
      gvcnDtFk: foreignKey(() => ({
        columns: [table.gvcnDt],
        foreignColumns: [giaoVien.magv],
      })),
      macdFk: foreignKey(() => ({
        columns: [table.macd],
        foreignColumns: [chuDe.macd],
      })),
    };
  }
);

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
      madtFk: foreignKey(() => ({
        columns: [table.madt],
        foreignColumns: [deTai.madt],
      })),
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
      magvFk: foreignKey(() => ({
        columns: [table.magv],
        foreignColumns: [giaoVien.magv],
      })),
      congViecFk: foreignKey(() => ({
        columns: [table.madt, table.stt],
        foreignColumns: [congViec.madt, congViec.sott],
      })),
    };
  }
);
