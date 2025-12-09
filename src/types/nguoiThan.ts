import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const nguoiThanSelectSchema = createSelectSchema(schema.nguoiThan);
export const nguoiThanInsertSchema = createInsertSchema(schema.nguoiThan);
export const nguoiThanUpdateSchema = createUpdateSchema(schema.nguoiThan);

export type NguoiThan = z.infer<typeof nguoiThanSelectSchema>;
export type NguoiThanInsert = z.infer<typeof nguoiThanInsertSchema>;
export type NguoiThanUpdate = z.infer<typeof nguoiThanUpdateSchema>;
