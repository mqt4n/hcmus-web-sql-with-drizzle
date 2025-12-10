import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const giaoVienSelectSchema = createSelectSchema(schema.giaoVien);
export const giaoVienInsertSchema = createInsertSchema(schema.giaoVien);
export const giaoVienUpdateSchema = createUpdateSchema(schema.giaoVien);

export type GiaoVien = z.infer<typeof giaoVienSelectSchema>;
export type GiaoVienInsert = z.infer<typeof giaoVienInsertSchema>;
export type GiaoVienUpdate = z.infer<typeof giaoVienUpdateSchema>;