import { db, schema } from '../db';
import { eq } from 'drizzle-orm';

export class TopicService {
  async getAllTopics() {
    return await db.select().from(schema.chuDe);
  }

  async getTopicById(id: string) {
    const result = await db.select().from(schema.chuDe).where(eq(schema.chuDe.macd, id)).limit(1);
    return result[0] || null;
  }

  async createTopic(data: typeof schema.chuDe.$inferInsert) {
    const result = await db.insert(schema.chuDe).values(data).returning();
    return result[0];
  }

  async updateTopic(id: string, data: Partial<typeof schema.chuDe.$inferInsert>) {
    const result = await db.update(schema.chuDe).set(data).where(eq(schema.chuDe.macd, id)).returning();
    return result[0] || null;
  }

  async deleteTopic(id: string) {
    const result = await db.delete(schema.chuDe).where(eq(schema.chuDe.macd, id)).returning();
    return result[0] || null;
  }
}

export const topicService = new TopicService();
