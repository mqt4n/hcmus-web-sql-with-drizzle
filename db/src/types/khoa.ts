import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const khoaSelectSchema = createSelectSchema(schema.khoa);
export const khoaInsertSchema = createInsertSchema(schema.khoa);
export const khoaUpdateSchema = createUpdateSchema(schema.khoa);

export type Khoa = z.infer<typeof khoaSelectSchema>;
export type KhoaInsert = z.infer<typeof khoaInsertSchema>;
export type KhoaUpdate = z.infer<typeof khoaUpdateSchema>;
