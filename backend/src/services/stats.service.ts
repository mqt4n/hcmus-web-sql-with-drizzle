import { db, schema } from '../db';
import { eq, gt, desc, sql } from 'drizzle-orm';

export class StatsService {
  async getDashboardStats() {
    const result = await db
      .select({
        maBM: schema.boMon.mabm,
        tenBoMon: schema.boMon.tenBm,
        phong: schema.boMon.phong,
        // Aggregation functions
        soLuongGV: sql<number>`count(${schema.giaoVien.magv})`,
        tongQuyLuong: sql<number>`sum(${schema.giaoVien.luong})`,
        luongTB: sql<number>`avg(${schema.giaoVien.luong})`,
        luongMin: sql<number>`min(${schema.giaoVien.luong})`,
        luongMax: sql<number>`max(${schema.giaoVien.luong})`,
      })
      .from(schema.boMon)
      .leftJoin(schema.giaoVien, eq(schema.boMon.mabm, schema.giaoVien.mabm))
      .groupBy(schema.boMon.mabm) // Nhóm theo bộ môn
      .having(gt(sql`count(${schema.giaoVien.magv})`, 0)) // Chỉ lấy bộ môn có giáo viên
      .orderBy(desc(sql`sum(${schema.giaoVien.luong})`)); // Bộ môn chi nhiều tiền nhất lên đầu

    return result;
  }


  async getOverallStats() {
    const totalTeachers = await db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(schema.giaoVien);

    const totalProjects = await db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(schema.deTai);

    const totalDepartments = await db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(schema.boMon);

    const totalSalary = await db
      .select({
        total: sql<number>`sum(${schema.giaoVien.luong})`,
      })
      .from(schema.giaoVien);

    return {
      totalTeachers: totalTeachers[0]?.total || 0,
      totalProjects: totalProjects[0]?.total || 0,
      totalDepartments: totalDepartments[0]?.total || 0,
      totalSalaryBudget: totalSalary[0]?.total || 0,
    };
  }

  async getTeachersByGender() {
    const result = await db
      .select({
        phai: schema.giaoVien.phai,
        soLuong: sql<number>`count(*)`,
        luongTB: sql<number>`avg(${schema.giaoVien.luong})`,
      })
      .from(schema.giaoVien)
      .groupBy(schema.giaoVien.phai);

    return result;
  }

  async getTopTeachersBySalary(limit: number = 10) {
    const result = await db
      .select({
        magv: schema.giaoVien.magv,
        hoTen: schema.giaoVien.hoTen,
        luong: schema.giaoVien.luong,
        tenBoMon: schema.boMon.tenBm,
      })
      .from(schema.giaoVien)
      .leftJoin(schema.boMon, eq(schema.giaoVien.mabm, schema.boMon.mabm))
      .orderBy(desc(schema.giaoVien.luong))
      .limit(limit);

    return result;
  }

  async getProjectsByTopic() {
    const result = await db
      .select({
        maChuDe: schema.chuDe.macd,
        tenChuDe: schema.chuDe.tenCd,
        soLuongDeTai: sql<number>`count(${schema.deTai.madt})`,
        tongKinhPhi: sql<number>`sum(${schema.deTai.kinhPhi})`,
        kinhPhiTB: sql<number>`avg(${schema.deTai.kinhPhi})`,
      })
      .from(schema.chuDe)
      .leftJoin(schema.deTai, eq(schema.chuDe.macd, schema.deTai.macd))
      .groupBy(schema.chuDe.macd)
      .orderBy(desc(sql`count(${schema.deTai.madt})`));

    return result;
  }
}

export const statsService = new StatsService();
