import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const gvDtSelectSchema = createSelectSchema(schema.gvDt);
export const gvDtInsertSchema = createInsertSchema(schema.gvDt);
export const gvDtUpdateSchema = createUpdateSchema(schema.gvDt);

export type GvDt = z.infer<typeof gvDtSelectSchema>;
export type GvDtInsert = z.infer<typeof gvDtInsertSchema>;
export type GvDtUpdate = z.infer<typeof gvDtUpdateSchema>;
