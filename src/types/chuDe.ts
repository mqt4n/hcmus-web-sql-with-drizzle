import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const chuDeSelectSchema = createSelectSchema(schema.chuDe);
export const chuDeInsertSchema = createInsertSchema(schema.chuDe);
export const chuDeUpdateSchema = createUpdateSchema(schema.chuDe);

export type ChuDe = z.infer<typeof chuDeSelectSchema>;
export type ChuDeInsert = z.infer<typeof chuDeInsertSchema>;
export type ChuDeUpdate = z.infer<typeof chuDeUpdateSchema>;
