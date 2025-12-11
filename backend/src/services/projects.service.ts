import { db, schema, eq } from '../db';

export class ProjectsService {
  async getAllProjects() {
    return await db.select().from(schema.deTai);
  }

  async getProjectById(id: string) {
    const result = await db.select().from(schema.deTai).where(eq(schema.deTai.madt, id)).limit(1);
    return result[0] || null;
  }

  async createProject(data: typeof schema.deTai.$inferInsert) {
    const result = await db.insert(schema.deTai).values(data).returning();
    return result[0];
  }

  async updateProject(id: string, data: Partial<typeof schema.deTai.$inferInsert>) {
    const result = await db.update(schema.deTai).set(data).where(eq(schema.deTai.madt, id)).returning();
    return result[0] || null;
  }

  async deleteProject(id: string) {
    const result = await db.delete(schema.deTai).where(eq(schema.deTai.madt, id)).returning();
    return result[0] || null;
  }

  async getProjectsByTopic(topicId: string) {
    return await db.select().from(schema.deTai).where(eq(schema.deTai.macd, topicId));
  }

  async getFlatProjects() {
    const result = await db
      .select({
        maDeTai: schema.deTai.madt,
        tenDeTai: schema.deTai.tenDt,
        kinhPhi: schema.deTai.kinhPhi,
        capQl: schema.deTai.capQl,
        ngayBd: schema.deTai.ngayBd,
        ngayKt: schema.deTai.ngayKt,
        // Thông tin giáo viên tham gia (null nếu không có)
        tenGiaoVien: schema.giaoVien.hoTen,
        maGiaoVien: schema.giaoVien.magv,
        phuCap: schema.thamGiaDt.phuCap,
        ketQua: schema.thamGiaDt.ketQua,
      })
      .from(schema.deTai)
      // Left Join 1: Nối bảng trung gian thamGiaDt
      .leftJoin(schema.thamGiaDt, eq(schema.deTai.madt, schema.thamGiaDt.madt))
      // Left Join 2: Nối bảng giaoVien để lấy thông tin giáo viên
      .leftJoin(schema.giaoVien, eq(schema.thamGiaDt.magv, schema.giaoVien.magv));

    return result;
  }

  async getNestedProjects() {
    const result = await db.query.deTai.findMany({
      columns: {
        madt: true,
        tenDt: true,
        kinhPhi: true,
        capQl: true,
        ngayBd: true,
        ngayKt: true,
      },
      with: {
        // Relation 1: Lấy chủ đề
        chuDe: {
          columns: {
            macd: true,
            tenCd: true,
          },
        },
        // Relation 2: Lấy giáo viên chủ nhiệm
        giaoVienChuNhiem: {
          columns: {
            magv: true,
            hoTen: true,
            luong: true,
          },
        },
        // Relation 3: Lấy danh sách tham gia (many-to-many)
        thamGiaDts: {
          columns: {
            phuCap: true,
            ketQua: true,
          },
          with: {
            // Nested relation: Lấy thông tin chi tiết giáo viên
            giaoVien: {
              columns: {
                magv: true,
                hoTen: true,
                phai: true,
                diaChi: true,
              },
            },
            // Nested relation: Lấy thông tin công việc
            congViec: {
              columns: {
                sott: true,
                tenCv: true,
                ngayBd: true,
                ngayKt: true,
              },
            },
          },
        },
        // Relation 4: Lấy danh sách công việc của đề tài
        congViecs: {
          columns: {
            sott: true,
            tenCv: true,
            ngayBd: true,
            ngayKt: true,
          },
        },
      },
    });

    return result;
  }

  async getNestedProjectById(projectId: string) {
    const result = await db.query.deTai.findFirst({
      where: eq(schema.deTai.madt, projectId),
      with: {
        chuDe: true,
        giaoVienChuNhiem: true,
        thamGiaDts: {
          with: {
            giaoVien: true,
            congViec: true,
          },
        },
        congViecs: true,
      },
    });

    return result;
  }
}

export const projectsService = new ProjectsService();
