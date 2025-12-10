import { db, schema } from '../db';
import { eq } from 'drizzle-orm';

export class TeacherService {
  async getAllTeachers() {
    return await db.select().from(schema.giaoVien);
  }

  async getTeacherById(id: string) {
    const result = await db.select().from(schema.giaoVien).where(eq(schema.giaoVien.magv, id)).limit(1);

    return result[0] || null;
  }

  async createTeacher(data: typeof schema.giaoVien.$inferInsert) {
    const result = await db.insert(schema.giaoVien).values(data).returning();

    return result[0];
  }

  async updateTeacher(id: string, data: Partial<typeof schema.giaoVien.$inferInsert>) {
    const result = await db.update(schema.giaoVien).set(data).where(eq(schema.giaoVien.magv, id)).returning();

    return result[0] || null;
  }

  async deleteTeacher(id: string) {
    const result = await db.delete(schema.giaoVien).where(eq(schema.giaoVien.magv, id)).returning();

    return result[0] || null;
  }

  async getTeachersByDepartment(departmentId: string) {
    return await db.select().from(schema.giaoVien).where(eq(schema.giaoVien.mabm, departmentId));
  }
}

export const teacherService = new TeacherService();
