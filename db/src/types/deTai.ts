import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const deTaiSelectSchema = createSelectSchema(schema.deTai);
export const deTaiInsertSchema = createInsertSchema(schema.deTai);
export const deTaiUpdateSchema = createUpdateSchema(schema.deTai);

export type DeTai = z.infer<typeof deTaiSelectSchema>;
export type DeTaiInsert = z.infer<typeof deTaiInsertSchema>;
export type DeTaiUpdate = z.infer<typeof deTaiUpdateSchema>;
