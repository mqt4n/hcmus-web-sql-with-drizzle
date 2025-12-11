import { db } from '../index';
import {
  BoMonInsert,
  ChuDeInsert,
  CongViecInsert,
  DeTaiInsert,
  GiaoVienInsert,
  KhoaInsert,
  NguoiThanInsert,
  ThamGiaDtInsert,
  GvDtInsert,
} from '../types';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

const giaoVienData: GiaoVienInsert[] = [
  {
    magv: '001',
    hoTen: 'Nguyễn Hoài An',
    luong: 2000,
    phai: 'Nam',
    ngSinh: '1973-02-15',
    diaChi: '25/3 Lạc Long Quân, Q.10, TP HCM',
  },
  {
    magv: '002',
    hoTen: 'Trần Trà Hương',
    luong: 2500,
    phai: 'Nữ',
    ngSinh: '1960-06-20',
    diaChi: '125 Trần Hưng Đạo, Q.1, TP HCM',
  },
  {
    magv: '003',
    hoTen: 'Nguyễn Ngọc Ánh',
    luong: 2200,
    phai: 'Nữ',
    ngSinh: '1975-05-11',
    diaChi: '12/21 Võ Văn Ngân Thủ Đức, TPHCM',
  },
  {
    magv: '004',
    hoTen: 'Trương Nam Sơn',
    luong: 2300,
    phai: 'Nam',
    ngSinh: '1959-06-20',
    diaChi: '215 Lý Thường Kiệt, TP Biên Hoà',
  },
  {
    magv: '005',
    hoTen: 'Lý Hoàng Hà',
    luong: 2500,
    phai: 'Nam',
    ngSinh: '1954-10-23',
    diaChi: '22/5 Nguyễn Xí, Q. Bình Thạnh, TP HCM',
  },
  {
    magv: '006',
    hoTen: 'Trần Bạch Tuyết',
    luong: 1500,
    phai: 'Nữ',
    ngSinh: '1980-05-20',
    diaChi: '127 Hùng Vương, TP Mỹ Tho',
  },
  {
    magv: '007',
    hoTen: 'Nguyễn An Trung',
    luong: 2100,
    phai: 'Nam',
    ngSinh: '1976-06-05',
    diaChi: '234 3/2, TP Biên Hoà',
  },
  {
    magv: '008',
    hoTen: 'Trần Trung Hiếu',
    luong: 1800,
    phai: 'Nam',
    ngSinh: '1977-08-06',
    diaChi: '22/11 Lý Thường Kiệt, TP Mỹ Tho',
  },
  {
    magv: '009',
    hoTen: 'Trần Hoàng Nam',
    luong: 2000,
    phai: 'Nam',
    ngSinh: '1975-11-22',
    diaChi: '234 Trần Não, An Phú, TP HCM',
  },
  {
    magv: '010',
    hoTen: 'Phạm Nam Thanh',
    luong: 1500,
    phai: 'Nam',
    ngSinh: '1980-12-12',
    diaChi: '221 Hùng Vương, Q.5, TP HCM',
  },
];

const khoaData: KhoaInsert[] = [
  {
    maKhoa: 'CNTT',
    tenKhoa: 'Công nghệ thông tin',
    namTl: 1995,
    phong: 'B11',
    dienThoai: '0838123456',
    truongKhoa: '002',
    ngayNhanChuc: '2005-02-20',
  },
  {
    maKhoa: 'HH',
    tenKhoa: 'Hóa học',
    namTl: 1980,
    phong: 'B41',
    dienThoai: '0838456456',
    truongKhoa: '007',
    ngayNhanChuc: '2001-10-15',
  },
  {
    maKhoa: 'SH',
    tenKhoa: 'Sinh học',
    namTl: 1980,
    phong: 'B31',
    dienThoai: '0838454545',
    truongKhoa: '004',
    ngayNhanChuc: '2000-10-11',
  },
  {
    maKhoa: 'VL',
    tenKhoa: 'Vật lý',
    namTl: 1976,
    phong: 'B21',
    dienThoai: '0838223223',
    truongKhoa: '005',
    ngayNhanChuc: '2003-09-18',
  },
];

const boMonData: BoMonInsert[] = [
  {
    mabm: 'CNTT',
    tenBm: 'Công nghệ tri thức',
    phong: 'B15',
    dienThoai: '0838126126',
    truongBm: null,
    maKhoa: 'CNTT',
    ngayNhanChuc: null,
  },
  {
    mabm: 'HHC',
    tenBm: 'Hóa hữu cơ',
    phong: 'B44',
    dienThoai: '0838222222',
    truongBm: null,
    maKhoa: 'HH',
    ngayNhanChuc: null,
  },
  {
    mabm: 'HL',
    tenBm: 'Hóa lý',
    phong: 'B42',
    dienThoai: '0838878787',
    truongBm: null,
    maKhoa: 'HH',
    ngayNhanChuc: null,
  },
  {
    mabm: 'HPT',
    tenBm: 'Hóa phân tích',
    phong: 'B43',
    dienThoai: '0838777777',
    truongBm: '007',
    maKhoa: 'HH',
    ngayNhanChuc: '2007-10-15',
  },
  {
    mabm: 'HTTT',
    tenBm: 'Hệ thống thông tin',
    phong: 'B13',
    dienThoai: '0838125125',
    truongBm: '002',
    maKhoa: 'CNTT',
    ngayNhanChuc: '2004-09-20',
  },
  {
    mabm: 'MMT',
    tenBm: 'Mạng máy tính',
    phong: 'B16',
    dienThoai: '0838676767',
    truongBm: '001',
    maKhoa: 'CNTT',
    ngayNhanChuc: '2005-05-15',
  },
  {
    mabm: 'SH',
    tenBm: 'Sinh hóa',
    phong: 'B33',
    dienThoai: '0838898989',
    truongBm: null,
    maKhoa: 'SH',
    ngayNhanChuc: null,
  },
  {
    mabm: 'VLĐT',
    tenBm: 'Vật lý điện tử',
    phong: 'B23',
    dienThoai: '0838234234',
    truongBm: null,
    maKhoa: 'VL',
    ngayNhanChuc: null,
  },
  {
    mabm: 'VLƯD',
    tenBm: 'Vật lý ứng dụng',
    phong: 'B24',
    dienThoai: '0838454545',
    truongBm: '005',
    maKhoa: 'VL',
    ngayNhanChuc: '2006-02-18',
  },
  {
    mabm: 'VS',
    tenBm: 'Vi sinh',
    phong: 'B32',
    dienThoai: '0838909090',
    truongBm: '004',
    maKhoa: 'SH',
    ngayNhanChuc: '2007-01-01',
  },
];

const chuDeData: ChuDeInsert[] = [
  { macd: 'NCPT', tenCd: 'Nghiên cứu phát triển' },
  { macd: 'QLGD', tenCd: 'Quản lý giáo dục' },
  { macd: 'ƯDCN', tenCd: 'Ứng dụng công nghệ' },
];

const deTaiData: DeTaiInsert[] = [
  {
    madt: '001',
    tenDt: 'HTTT quản lý các trường ĐH',
    capQl: 'ĐHQG',
    kinhPhi: 20,
    ngayBd: '2007-10-20',
    ngayKt: '2008-10-20',
    macd: 'QLGD',
    gvcnDt: '002',
  },
  {
    madt: '002',
    tenDt: 'HTTT quản lý giáo vụ cho một Khoa',
    capQl: 'Trường',
    kinhPhi: 20,
    ngayBd: '2000-10-12',
    ngayKt: '2001-10-12',
    macd: 'QLGD',
    gvcnDt: '002',
  },
  {
    madt: '003',
    tenDt: 'Nghiên cứ chế tạo sợi Nanô Platin',
    capQl: 'ĐHQG',
    kinhPhi: 300,
    ngayBd: '2008-05-15',
    ngayKt: '2010-05-15',
    macd: 'NCPT',
    gvcnDt: '005',
  },
  {
    madt: '004',
    tenDt: 'Tạo vật liệu sinh học bằng màng ối người',
    capQl: 'Nhà nước',
    kinhPhi: 100,
    ngayBd: '2007-01-01',
    ngayKt: '2009-12-31',
    macd: 'NCPT',
    gvcnDt: '004',
  },
  {
    madt: '005',
    tenDt: 'Ứng dụng hóa học xanh',
    capQl: 'Trường',
    kinhPhi: 200,
    ngayBd: '2003-10-10',
    ngayKt: '2004-12-10',
    macd: 'ƯDCN',
    gvcnDt: '007',
  },
  {
    madt: '006',
    tenDt: 'Nghiên cứu tế bào gốc',
    capQl: 'Nhà nước',
    kinhPhi: 4000,
    ngayBd: '2006-10-20',
    ngayKt: '2009-10-20',
    macd: 'NCPT',
    gvcnDt: '004',
  },
  {
    madt: '007',
    tenDt: 'HTTT quản lý thư viện ở các trường ĐH',
    capQl: 'Trường',
    kinhPhi: 20,
    ngayBd: '2009-05-10',
    ngayKt: '2010-05-10',
    macd: 'QLGD',
    gvcnDt: '001',
  },
];

const congViecData: CongViecInsert[] = [
  { madt: '001', sott: 1, tenCv: 'Khởi tạo và Lập kế hoạch', ngayBd: '2007-10-20', ngayKt: '2008-12-20' },
  { madt: '001', sott: 2, tenCv: 'Xác định yêu cầu', ngayBd: '2008-12-21', ngayKt: '2008-03-21' },
  { madt: '001', sott: 3, tenCv: 'Phân tích hệ thống', ngayBd: '2008-03-22', ngayKt: '2008-05-22' },
  { madt: '001', sott: 4, tenCv: 'Thiết kế hệ thống', ngayBd: '2008-05-23', ngayKt: '2008-06-23' },
  { madt: '001', sott: 5, tenCv: 'Cài đặt thử nghiệm', ngayBd: '2008-06-24', ngayKt: '2008-10-20' },
  { madt: '002', sott: 1, tenCv: 'Khởi tạo và Lập kế hoạch', ngayBd: '2009-05-10', ngayKt: '2009-10-11' },
  { madt: '002', sott: 2, tenCv: 'Xác định yêu cầu', ngayBd: '2009-07-11', ngayKt: '2009-10-11' },
  { madt: '002', sott: 3, tenCv: 'Phân tích hệ thống', ngayBd: '2009-12-31', ngayKt: '2010-03-22' },
  { madt: '002', sott: 4, tenCv: 'Thiết kế hệ thống', ngayBd: '2009-12-21', ngayKt: '2010-03-22' },
  { madt: '002', sott: 5, tenCv: 'Cài đặt thử nghiệm', ngayBd: '2010-03-23', ngayKt: '2010-05-10' },
  { madt: '006', sott: 1, tenCv: 'Lấy mẫu', ngayBd: '2006-10-20', ngayKt: '2007-02-20' },
  { madt: '006', sott: 2, tenCv: 'Nuôi cấy', ngayBd: '2007-02-21', ngayKt: '2008-08-21' },
];

const thamGiaDtData: ThamGiaDtInsert[] = [
  { magv: '001', madt: '002', stt: 1, phuCap: 0, ketQua: null },
  { magv: '001', madt: '002', stt: 2, phuCap: 2, ketQua: null },
  { magv: '002', madt: '001', stt: 4, phuCap: 2, ketQua: 'Đạt' },
  { magv: '003', madt: '001', stt: 1, phuCap: 1, ketQua: 'Đạt' },
  { magv: '003', madt: '001', stt: 2, phuCap: 0, ketQua: 'Đạt' },
  { magv: '003', madt: '001', stt: 4, phuCap: 1, ketQua: 'Đạt' },
  { magv: '003', madt: '002', stt: 2, phuCap: 0, ketQua: null },
  { magv: '004', madt: '006', stt: 1, phuCap: 0, ketQua: 'Đạt' },
  { magv: '004', madt: '006', stt: 2, phuCap: 1, ketQua: 'Đạt' },
  { magv: '006', madt: '006', stt: 2, phuCap: 1.5, ketQua: 'Đạt' },
  { magv: '009', madt: '002', stt: 3, phuCap: 0.5, ketQua: null },
  { magv: '009', madt: '002', stt: 4, phuCap: 1.5, ketQua: null },
];

const nguoiThanData: NguoiThanInsert[] = [
  { magv: '001', ten: 'Hùng', ngSinh: '1990-01-14', phai: 'Nam' },
  { magv: '001', ten: 'Thủy', ngSinh: '1994-12-08', phai: 'Nữ' },
  { magv: '003', ten: 'Hà', ngSinh: '1998-09-03', phai: 'Nữ' },
  { magv: '003', ten: 'Thu', ngSinh: '1998-09-03', phai: 'Nữ' },
  { magv: '007', ten: 'Mai', ngSinh: '2003-03-26', phai: 'Nữ' },
  { magv: '007', ten: 'Vy', ngSinh: '2000-02-14', phai: 'Nữ' },
  { magv: '008', ten: 'Nam', ngSinh: '1991-05-06', phai: 'Nam' },
  { magv: '009', ten: 'An', ngSinh: '1996-08-19', phai: 'Nam' },
  { magv: '010', ten: 'Nguyệt', ngSinh: '2006-01-14', phai: 'Nữ' },
];

const gvDtData: GvDtInsert[] = [
  { magv: '001', dienThoai: '0838912112' },
  { magv: '001', dienThoai: '0903123123' },
  { magv: '002', dienThoai: '0913454545' },
  { magv: '003', dienThoai: '0838121212' },
  { magv: '003', dienThoai: '0903656565' },
  { magv: '003', dienThoai: '0937125125' },
  { magv: '006', dienThoai: '0937888888' },
  { magv: '008', dienThoai: '0653717171' },
  { magv: '008', dienThoai: '0913232323' },
];

const giaoVienUpdateData = [
  { magv: '001', gvqlcm: null, mabm: 'MMT' },
  { magv: '002', gvqlcm: null, mabm: 'HTTT' },
  { magv: '003', gvqlcm: '002', mabm: 'HTTT' },
  { magv: '004', gvqlcm: null, mabm: 'VS' },
  { magv: '005', gvqlcm: null, mabm: 'VLĐT' },
  { magv: '006', gvqlcm: '004', mabm: 'VS' },
  { magv: '007', gvqlcm: null, mabm: 'HPT' },
  { magv: '008', gvqlcm: '007', mabm: 'HPT' },
  { magv: '009', gvqlcm: '001', mabm: 'MMT' },
  { magv: '010', gvqlcm: '007', mabm: 'HPT' },
];

async function seed() {
  try {
    await db.delete(schema.gvDt).execute();
    await db.delete(schema.nguoiThan).execute();
    await db.delete(schema.thamGiaDt).execute();
    await db.delete(schema.congViec).execute();
    await db.delete(schema.deTai).execute();
    await db.delete(schema.chuDe).execute();
    await db.delete(schema.boMon).execute();
    await db.delete(schema.khoa).execute();
    await db.delete(schema.giaoVien).execute();

    await db.insert(schema.giaoVien).values(giaoVienData).execute();
    await db.insert(schema.khoa).values(khoaData).execute();
    await db.insert(schema.boMon).values(boMonData).execute();
    await db.insert(schema.chuDe).values(chuDeData).execute();
    await db.insert(schema.deTai).values(deTaiData).execute();
    await db.insert(schema.congViec).values(congViecData).execute();
    await db.insert(schema.thamGiaDt).values(thamGiaDtData).execute();
    await db.insert(schema.nguoiThan).values(nguoiThanData).execute();
    await db.insert(schema.gvDt).values(gvDtData).execute();

    for (const updateItem of giaoVienUpdateData) {
      await db
        .update(schema.giaoVien)
        .set({ gvqlcm: updateItem.gvqlcm, mabm: updateItem.mabm })
        .where(eq(schema.giaoVien.magv, updateItem.magv))
        .execute();
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seed()
  .then(() => {
    console.log('Seeding successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding fail:', err);
    process.exit(1);
  });
