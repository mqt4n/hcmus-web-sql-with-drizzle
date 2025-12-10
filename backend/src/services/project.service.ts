import { db, schema } from '../db';
import { eq } from 'drizzle-orm';

export class ProjectService {
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
}

export const projectService = new ProjectService();
